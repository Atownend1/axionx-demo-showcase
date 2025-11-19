#!/bin/bash

# AxionX Domain Diagnostic Script
# Tests all domains and endpoints to verify configuration

echo "🔍 AxionX Domain Diagnostic Tool"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test DNS
test_dns() {
    local domain=$1
    local expected=$2
    
    echo -n "Testing DNS for $domain... "
    result=$(dig +short $domain | head -1)
    
    if [ -n "$result" ]; then
        echo -e "${GREEN}✓${NC} Resolves to: $result"
        PASSED=$((PASSED + 1))
        if [ -n "$expected" ]; then
            if [[ "$result" == *"$expected"* ]]; then
                echo "  ${GREEN}✓${NC} Matches expected: $expected"
            else
                echo "  ${YELLOW}⚠${NC} Expected: $expected, Got: $result"
            fi
        fi
    else
        echo -e "${RED}✗${NC} DNS not resolving"
        FAILED=$((FAILED + 1))
    fi
    echo ""
}

# Function to test HTTP/HTTPS
test_http() {
    local url=$1
    local description=$2
    
    echo -n "Testing $description ($url)... "
    
    # Test with timeout
    http_code=$(curl -k -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        if [ "$http_code" -eq 200 ]; then
            echo -e "${GREEN}✓${NC} HTTP $http_code - OK"
            PASSED=$((PASSED + 1))
        elif [ "$http_code" -eq 301 ] || [ "$http_code" -eq 302 ]; then
            redirect=$(curl -k -s -I -L --max-time 10 "$url" | grep -i "location:" | head -1 | cut -d' ' -f2 | tr -d '\r')
            echo -e "${YELLOW}↪${NC} HTTP $http_code - Redirects to: $redirect"
            PASSED=$((PASSED + 1))
        else
            echo -e "${RED}✗${NC} HTTP $http_code"
            FAILED=$((FAILED + 1))
        fi
    else
        echo -e "${RED}✗${NC} Connection failed or timeout"
        FAILED=$((FAILED + 1))
    fi
    echo ""
}

# Function to test API endpoint
test_api() {
    local url=$1
    
    echo -n "Testing API endpoint ($url)... "
    
    response=$(curl -k -s --max-time 10 "$url" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$response" ]; then
        echo -e "${GREEN}✓${NC} API responding"
        echo "  Response: $response"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} API not responding"
        FAILED=$((FAILED + 1))
    fi
    echo ""
}

# Function to test SSL
test_ssl() {
    local domain=$1
    
    echo -n "Testing SSL certificate for $domain... "
    
    result=$(echo | openssl s_client -connect $domain:443 -servername $domain 2>/dev/null | grep "Verify return code")
    
    if [[ "$result" == *"0 (ok)"* ]]; then
        echo -e "${GREEN}✓${NC} SSL certificate valid"
        PASSED=$((PASSED + 1))
    else
        echo -e "${YELLOW}⚠${NC} SSL issue: $result"
        FAILED=$((FAILED + 1))
    fi
    echo ""
}

echo "📡 STEP 1: DNS Resolution Tests"
echo "================================"
test_dns "axionx.uk"
test_dns "www.axionx.uk" "lovable"
test_dns "api.axionx.uk" "railway"

echo ""
echo "🌐 STEP 2: HTTP/HTTPS Connectivity Tests"
echo "========================================"
test_http "https://axionx.uk" "Root domain (HTTPS)"
test_http "https://www.axionx.uk" "WWW subdomain (HTTPS)"
test_http "http://axionx.uk" "Root domain (HTTP)"
test_http "http://www.axionx.uk" "WWW subdomain (HTTP)"

echo ""
echo "🚀 STEP 3: API Endpoint Tests"
echo "============================="
test_api "https://api.axionx.uk/"

echo ""
echo "🔒 STEP 4: SSL Certificate Tests"
echo "================================"
test_ssl "www.axionx.uk"
test_ssl "api.axionx.uk"

echo ""
echo "📊 SUMMARY"
echo "=========="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed! Your domains are configured correctly.${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Please review the output above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "1. Wait 5-30 minutes for DNS propagation"
    echo "2. Wait 5-15 minutes for SSL certificate generation"
    echo "3. Check IONOS DNS settings match documentation"
    echo "4. Verify Lovable and Railway custom domains are configured"
    echo "5. See DOMAIN_TROUBLESHOOTING.md for detailed help"
    exit 1
fi

