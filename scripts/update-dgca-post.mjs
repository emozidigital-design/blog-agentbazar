import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pxbqfbbzxxvwthygiihx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI');

const content = `<p dir="ltr"><span><strong>Overview: A Shift Toward Passenger-Centric Aviation</strong></span></p>
<p dir="ltr"><span>India’s aviation regulator, Directorate General of Civil Aviation (DGCA), has rolled out updated <strong>Civil Aviation Requirements (CAR)</strong> effective <strong>March 26, 2026</strong>.</span></p>
<p dir="ltr"><span>These reforms are designed to:</span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Increase booking flexibility</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Improve refund timelines</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Enhance transparency in fare rules</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Reduce friction between airlines and passengers</span></p></li>
</ul>
<p dir="ltr"><span>For B2B travel agents and consolidators, this is a <strong>major operational shift</strong> that directly impacts ticketing workflows, customer communication, and post-booking servicing.</span></p>
<p dir="ltr"><span><strong>Key Update #1: 48-Hour Free Modification &amp; Cancellation Window</strong></span></p>
<p dir="ltr"><span><strong>What’s New</strong></span></p>
<p dir="ltr"><span>Passengers can now:</span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Modify flight dates without penalties within 48 hours of booking</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Cancel bookings for a full refund if booked at least 7 days before departure</span></p></li>
</ul>
<p dir="ltr"><span><strong>Conditions</strong></span></p>
<p dir="ltr"><span><strong>Segment Type: Eligibility</strong></span></p>
<p dir="ltr"><span>Domestic Flights: Departure ≥ 7 days away</span></p>
<p dir="ltr"><span>International Flights: Departure ≥ 15 days away</span></p>
<p dir="ltr"><span><strong>B2B Impact</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Reduced customer service overhead for early cancellations</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Need for real-time sync with airline cancellation APIs</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Higher conversion rates for early-bird bookings</span></p></li>
</ul>
<p dir="ltr"><span><strong>Key Update #2: Free Name Corrections (Within 24 Hours)</strong></span></p>
<p dir="ltr"><span><strong>Rule</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Minor spelling corrections (up to 3 characters) are now free of charge</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Corrections must be requested within 24 hours of ticket issuance</span></p></li>
</ul>
<p dir="ltr"><span><strong>Limitation</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Not applicable to major name changes or transfers</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Restricted to the same passenger identity</span></p></li>
</ul>
<p dir="ltr"><span><strong>Strategic Insight for Agents</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Implement automated \"Name Validation\" checks during the first 24 hours</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Use this as a value-added service to build trust with clients</span></p></li>
</ul>
<p dir="ltr"><span><strong>Key Update #3: Flexible Refund Options (No More Forced Credit Shells)</strong></span></p>
<p dir="ltr"><span><strong>Before</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Airlines often defaulted to credit shells valid only for the same airline</span></p></li>
</ul>
<p dir="ltr"><span><strong>Now</strong></span></p>
<p dir="ltr"><span>Passengers can choose:</span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Direct cash refund to the original payment method</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Optional credit vouchers only if explicitly chosen by the traveler</span></p></li>
</ul>
<p dir="ltr"><span><strong>Why It Matters (B2B)</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Improves <strong>customer trust</strong> and repeat bookings</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Reduces disputes over expired credit shells</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Simplifies the accounting process for travel agencies</span></p></li>
</ul>
<p dir="ltr"><span><strong>Key Update #4: Faster Refund Timelines</strong></span></p>
<p dir="ltr"><span><strong>Payment Type: Refund Timeline</strong></span></p>
<p dir="ltr"><span>Credit Card: Within 7 days</span></p>
<p dir="ltr"><span>Cash Payments: Immediate</span></p>
<p dir="ltr"><span>Agent Bookings: Within 14 working days</span></p>
<p dir="ltr"><span><strong>Operational Impact</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Agents must track <strong>refund SLAs</strong> diligently</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Ensure sub-agents receive refunds within the 14-day window</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Automate follow-ups for pending airline refunds</span></p></li>
</ul>
<p dir="ltr"><span><strong>Key Update #5: Mandatory Transparency in Cancellation Charges</strong></span></p>
<p dir="ltr"><span>Airlines must now clearly display:</span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Exact cancellation fee breakdown</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Tax refund eligibility for non-refundable tickets</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Clear fare rules at the time of booking</span></p></li>
</ul>
<p dir="ltr"><span><strong>Benefit for Agents</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Easier <strong>client explanation</strong> during the booking process</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Reduced <strong>post-sale disputes</strong> regarding hidden charges</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Better transparency for corporate travel auditing</span></p></li>
</ul>
<p dir="ltr"><span><strong>Strategic Implications for B2B Travel Businesses</strong></span></p>
<p dir="ltr"><span><strong>1. Improve Conversion Rates</strong></span></p>
<p dir="ltr"><span>“Risk-free booking window” = Higher booking confidence for uncertain travelers</span></p>
<p dir="ltr"><span><strong>2. Build Better Client Trust</strong></span></p>
<p dir="ltr"><span>Transparent refunds = Reduced friction and better online reviews</span></p>
<p dir="ltr"><span><strong>3. Update Internal SOPs</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Train ticketing staff on the new 48-hour modification rules</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Update website and app T&Cs to reflect DGCA 2026 norms</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Audit sub-agent refund flows for compliance</span></p></li>
</ul>
<p dir="ltr"><span><strong>4. Opportunity for Upselling</strong></span></p>
<ul dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Promote flexible fares that extend beyond the mandatory windows</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Offer premium travel insurance for last-minute cancellations</span></p></li>
</ul>
<p dir="ltr"><span><strong>Recommended Automation Workflow (For Agents)</strong></span></p>
<p dir="ltr"><span>You can systemize this using <strong>Make.com / n8n</strong>:</span></p>
<ol dir="ltr">
<li dir="ltr"><p dir="ltr"><span>Monitor new bookings via GDS/API webhooks</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Send automated WhatsApp: \"Your 48-hour free change window is now active!\"</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Add internal task: Verify name spellings before the 24-hour mark</span></p></li>
<li dir="ltr"><p dir="ltr"><span>Track refund requests: Automatically ping airline APIs every 48 hours for status</span></p></li>
</ol>
<p dir="ltr"><span><strong>Conclusion: A Positive Shift, But Requires Adaptation</strong></span></p>
<p dir="ltr"><span>The 2026 DGCA reforms mark a clear move toward a <strong>more transparent and passenger-first aviation ecosystem</strong> in India. For travel agents and B2B players, this is an <strong>opportunity to upgrade service quality and build stronger client relationships</strong>.</span></p>
<p dir="ltr"><span>Created with ©Emozi Technologies</span></p>`;

async function update() {
    const { error } = await supabase
        .from('blog_posts')
        .update({ content })
        .eq('slug', 'dgca-2026-rules-free-ticket-changes-fast-refunds');
    
    if (error) {
        console.error('Error updating:', error.message);
    } else {
        console.log('Successfully updated DGCA post content');
    }
}

update();
