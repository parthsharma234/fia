#!/usr/bin/env python3
"""
Backend API Testing Suite
Tests all FastAPI endpoints to ensure proper functionality
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any
import uuid

# Backend URL from frontend environment
BACKEND_URL = "https://40b657ce-902b-4409-aade-609b9c2d835f.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Root endpoint (/api/)", True, "Returns correct 'Hello World' message")
                else:
                    self.log_test("Root endpoint (/api/)", False, f"Unexpected response: {data}")
            else:
                self.log_test("Root endpoint (/api/)", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Root endpoint (/api/)", False, f"Connection error: {str(e)}")

    def test_create_status_check(self):
        """Test creating a status check"""
        try:
            test_data = {
                "client_name": f"TestClient_{uuid.uuid4().hex[:8]}"
            }
            
            response = self.session.post(
                f"{self.base_url}/status",
                json=test_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "client_name", "timestamp"]
                
                if all(field in data for field in required_fields):
                    if data["client_name"] == test_data["client_name"]:
                        self.log_test("Create status check", True, f"Created status check with ID: {data['id']}")
                        return data["id"]  # Return ID for cleanup if needed
                    else:
                        self.log_test("Create status check", False, "Client name mismatch in response")
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Create status check", False, f"Missing fields: {missing}")
            else:
                self.log_test("Create status check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Create status check", False, f"Request error: {str(e)}")
        
        return None

    def test_get_status_checks(self):
        """Test retrieving status checks"""
        try:
            response = self.session.get(f"{self.base_url}/status")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Get status checks", True, f"Retrieved {len(data)} status checks")
                    
                    # If there are status checks, validate structure
                    if data:
                        first_item = data[0]
                        required_fields = ["id", "client_name", "timestamp"]
                        if all(field in first_item for field in required_fields):
                            self.log_test("Status check structure validation", True, "All required fields present")
                        else:
                            missing = [f for f in required_fields if f not in first_item]
                            self.log_test("Status check structure validation", False, f"Missing fields: {missing}")
                else:
                    self.log_test("Get status checks", False, f"Expected list, got: {type(data)}")
            else:
                self.log_test("Get status checks", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Get status checks", False, f"Request error: {str(e)}")

    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            # Test preflight request
            response = self.session.options(
                f"{self.base_url}/",
                headers={
                    "Origin": "https://example.com",
                    "Access-Control-Request-Method": "GET",
                    "Access-Control-Request-Headers": "Content-Type"
                }
            )
            
            cors_headers = [
                "access-control-allow-origin",
                "access-control-allow-methods",
                "access-control-allow-headers"
            ]
            
            present_headers = [h for h in cors_headers if h in response.headers]
            
            if len(present_headers) >= 2:  # At least origin and methods should be present
                self.log_test("CORS configuration", True, f"CORS headers present: {present_headers}")
            else:
                self.log_test("CORS configuration", False, f"Missing CORS headers. Present: {present_headers}")
                
        except Exception as e:
            self.log_test("CORS configuration", False, f"CORS test error: {str(e)}")

    def test_mongodb_connection(self):
        """Test MongoDB connection by creating and retrieving data"""
        try:
            # Create a test status check
            test_client_name = f"MongoTest_{uuid.uuid4().hex[:8]}"
            
            create_response = self.session.post(
                f"{self.base_url}/status",
                json={"client_name": test_client_name},
                headers={"Content-Type": "application/json"}
            )
            
            if create_response.status_code == 200:
                created_data = create_response.json()
                created_id = created_data["id"]
                
                # Retrieve all status checks to verify persistence
                get_response = self.session.get(f"{self.base_url}/status")
                
                if get_response.status_code == 200:
                    all_checks = get_response.json()
                    
                    # Check if our created item exists
                    found_item = next((item for item in all_checks if item["id"] == created_id), None)
                    
                    if found_item and found_item["client_name"] == test_client_name:
                        self.log_test("MongoDB persistence", True, f"Data successfully persisted and retrieved")
                    else:
                        self.log_test("MongoDB persistence", False, "Created data not found in retrieval")
                else:
                    self.log_test("MongoDB persistence", False, f"Failed to retrieve data: HTTP {get_response.status_code}")
            else:
                self.log_test("MongoDB persistence", False, f"Failed to create test data: HTTP {create_response.status_code}")
                
        except Exception as e:
            self.log_test("MongoDB persistence", False, f"Database test error: {str(e)}")

    def test_error_handling(self):
        """Test API error handling"""
        try:
            # Test invalid JSON
            response = self.session.post(
                f"{self.base_url}/status",
                data="invalid json",
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [400, 422]:  # Bad request or validation error
                self.log_test("Error handling - Invalid JSON", True, f"Properly handled invalid JSON with HTTP {response.status_code}")
            else:
                self.log_test("Error handling - Invalid JSON", False, f"Unexpected response to invalid JSON: HTTP {response.status_code}")
                
            # Test missing required field
            response = self.session.post(
                f"{self.base_url}/status",
                json={},  # Missing client_name
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [400, 422]:  # Validation error
                self.log_test("Error handling - Missing field", True, f"Properly handled missing field with HTTP {response.status_code}")
            else:
                self.log_test("Error handling - Missing field", False, f"Unexpected response to missing field: HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("Error handling", False, f"Error handling test failed: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("BACKEND API TESTING SUITE")
        print("=" * 60)
        print(f"Testing backend at: {self.base_url}")
        print()
        
        # Run all tests
        self.test_root_endpoint()
        self.test_create_status_check()
        self.test_get_status_checks()
        self.test_cors_headers()
        self.test_mongodb_connection()
        self.test_error_handling()
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Tests passed: {passed}/{total}")
        print(f"Success rate: {(passed/total)*100:.1f}%")
        print()
        
        # Show failed tests
        failed_tests = [result for result in self.test_results if not result["success"]]
        if failed_tests:
            print("FAILED TESTS:")
            for test in failed_tests:
                print(f"❌ {test['test']}: {test['details']}")
        else:
            print("🎉 All tests passed!")
        
        print()
        return passed == total

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)