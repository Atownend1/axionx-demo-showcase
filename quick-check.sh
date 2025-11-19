#!/bin/bash

# Quick DNS Check Script
echo "🔍 Quick DNS Propagation Check"
echo "=============================="
echo ""

# Check current DNS
echo "Current DNS for axionx.uk:"
dig +short axionx.uk
echo ""

# Expected result
echo "Expected: 185.158.133.2 (Lovable)"
echo "Old (wrong): 75.2.60.5 (Railway)"
echo ""

# Check if propagated
CURRENT_IP=$(dig +short axionx.uk | head -1)

if [[ "$CURRENT_IP" == "185.158.133.2" ]]; then
    echo "✅ SUCCESS! DNS has propagated to the new IP!"
    echo ""
    echo "Test now:"
    echo "  1. Open private/incognito browser"
    echo "  2. Visit: http://axionx.uk"
    echo "  3. Should show your landing page!"
elif [[ "$CURRENT_IP" == "75.2.60.5" ]]; then
    echo "⏳ Still showing old IP. DNS is propagating..."
    echo ""
    echo "Wait 5-10 more minutes, then run this script again:"
    echo "  ./quick-check.sh"
else
    echo "🤔 Unexpected result: $CURRENT_IP"
    echo "Check your IONOS settings to confirm the change was saved."
fi

