#!/usr/bin/env python3
"""
Test script for ChronoCast Python Probability Engine
"""

import requests
import json
from datetime import datetime

def test_health_endpoint():
    """Test the health check endpoint"""
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        print(f"Health Check - Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Health Check - Response: {json.dumps(data, indent=2)}")
            return True
        else:
            print(f"Health Check - Error: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"Health Check - Connection Error: {e}")
        return False

def test_probability_endpoint():
    """Test the probability calculation endpoint"""
    test_data = {
        "lat": 35.9,
        "lon": 31.9,
        "date": "2023-06-10"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/probability",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        print(f"Probability API - Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Probability API - Response: {json.dumps(data, indent=2)}")
            return True
        else:
            print(f"Probability API - Error: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"Probability API - Connection Error: {e}")
        return False

def test_invalid_data():
    """Test with invalid data to check error handling"""
    invalid_data = {
        "lat": "invalid",
        "lon": 31.9,
        "date": "invalid-date"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/probability",
            json=invalid_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        print(f"Invalid Data Test - Status: {response.status_code}")
        print(f"Invalid Data Test - Response: {response.text}")
        return response.status_code == 422  # Should return validation error
    except requests.exceptions.RequestException as e:
        print(f"Invalid Data Test - Connection Error: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing ChronoCast Python Probability Engine")
    print("=" * 50)
    
    print("\n1. Testing Health Endpoint...")
    health_ok = test_health_endpoint()
    
    print("\n2. Testing Probability Endpoint...")
    prob_ok = test_probability_endpoint()
    
    print("\n3. Testing Error Handling...")
    error_ok = test_invalid_data()
    
    print("\n" + "=" * 50)
    print("📊 Test Results:")
    print(f"Health Check: {'✅ PASS' if health_ok else '❌ FAIL'}")
    print(f"Probability API: {'✅ PASS' if prob_ok else '❌ FAIL'}")
    print(f"Error Handling: {'✅ PASS' if error_ok else '❌ FAIL'}")
    
    if all([health_ok, prob_ok, error_ok]):
        print("\n🎉 All tests passed! The Python API is working correctly.")
    else:
        print("\n⚠️  Some tests failed. Check the output above for details.")
