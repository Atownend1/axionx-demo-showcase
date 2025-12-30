make_overview.py
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

def create_axionx_overview():
    filename = "AxionX_Overview.pdf"
    doc = SimpleDocTemplate(
        filename, 
        pagesize=A4,
        rightMargin=50, leftMargin=50, topMargin=50, bottomMargin=50
    )

    # --- Styles ---
    styles = getSampleStyleSheet()
    
    # AxionX Brand Colors (Approximate based on description)
    axion_dark = colors.Color(0.1, 0.1, 0.15) # Dark almost black
    axion_purple = colors.Color(0.6, 0.4, 0.8) # Purple accent
    axion_blue = colors.Color(0.2, 0.4, 0.7)   # Blue accent

    # Title Style
    title_style = ParagraphStyle(
        'AxionTitle',
        parent=styles['Heading1'],
        fontSize=26,
        textColor=axion_dark,
        alignment=TA_LEFT,
        spaceAfter=20,
        leading=30
    )
    
    # Section Heading
    h1_style = ParagraphStyle(
        'AxionH1',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=axion_blue,
        spaceBefore=20,
        spaceAfter=12,
        leading=22
    )
    
    # Sub Heading
    h2_style = ParagraphStyle(
        'AxionH2',
        parent=styles['Heading3'],
        fontSize=14,
        textColor=axion_dark,
        spaceBefore=10,
        spaceAfter=6,
        leading=18
    )

    # Body Text
    body_style = ParagraphStyle(
        'AxionBody',
        parent=styles['Normal'],
        fontSize=11,
        textColor=colors.black,
        leading=15,
        spaceAfter=8
    )
    
    # Highlight/Quote Style
    quote_style = ParagraphStyle(
        'AxionQuote',
        parent=styles['Normal'],
        fontSize=11,
        textColor=colors.darkgrey,
        fontName='Helvetica-Oblique',
        leftIndent=20,
        spaceAfter=10
    )

    story = []

    # --- CONTENT ---

    # TITLE PAGE
    story.append(Spacer(1, 40))
    story.append(Paragraph("What is AxionX", title_style))
    story.append(Paragraph("The LLM of Enterprise Data Models.", h2_style))
    story.append(Spacer(1, 20))
    story.append(Paragraph("Mission & Vision", h1_style))
    
    story.append(Paragraph("<b>Vision:</b> Enterprise software should only be replaced for functionality gaps, never for data failures. AxionX is the AI platform that makes enterprise architecture adaptive.", body_style))
    story.append(Paragraph("<b>Mission:</b> We stop the data decay that forces companies to abandon their software. We use AI-driven governance to ensure systems evolve with business needs.", body_style))
    
    story.append(PageBreak())

    # MARKET OPPORTUNITY
    story.append(Paragraph("Market Opportunity", h1_style))
    story.append(Paragraph("<b>Key Metrics:</b>", body_style))
    story.append(Paragraph("• 1% market share equals a $2.4bn organisation.", body_style))
    story.append(Paragraph("• Fastest growing segments: AI solutions (33% CAGR) and Tech Consulting (21%).", body_style))
    story.append(Paragraph("• <b>Total Addressable Market (2025):</b> $480bn.", body_style))
    story.append(Paragraph("AxionX targets the gap where CFO demand meets execution reality.", body_style))

    # SERVICE LINES
    story.append(Paragraph("Service Lines", h1_style))
    
    services = [
        ("1. Data & AI Readiness Advisory", "Prove the outcome is achievable. Accurate forecasting of risk. <b>Value:</b> Entry point. Establishes budget."),
        ("2. Implementation (ERP, EPM & Data Warehouse)", "De-risked delivery. The tech backbone matches actual data maturity. <b>Value:</b> Revenue engine. Builds AI foundation."),
        ("3. Data Enablement Layer", "Automated data validation. Finds 'quick wins' humans miss. <b>Value:</b> Bridge between legacy systems and AI."),
        ("4. AI Automation & Governance", "Maintains clean data. Monitors structures continuously. <b>Value:</b> Transitions to recurring revenue."),
        ("5. Transformation-as-a-Service", "Identifies revenue opportunities in your data. Detects anomalies for automation. <b>Value:</b> 'Land and expand'.")
    ]

    for title, desc in services:
        story.append(Paragraph(f"<b>{title}</b>", h2_style))
        story.append(Paragraph(desc, body_style))

    story.append(PageBreak())

    # CORE INVESTMENT CASE
    story.append(Paragraph("Core Investment Case", h1_style))
    
    story.append(Paragraph("<b>Market Clarity</b>", h2_style))
    story.append(Paragraph("UK enterprises waste £3.1bn annually on Software, Data, and Consulting. 84% of CFOs do not get expected value.", body_style))
    story.append(Paragraph("<i>Example: Birmingham Council ERP. Budget: £19m -> Actual: £108m -> Projected Loss: £216m.</i>", quote_style))
    story.append(Paragraph("AxionX starts with the Data. We leverage AI to deliver real transformation.", body_style))

    story.append(Paragraph("<b>Problem Statement</b>", h2_style))
    story.append(Paragraph("Systems rot. Companies struggle with data quality and reporting decay. This leads to project failure.", body_style))

    story.append(Paragraph("<b>Solution Fit</b>", h2_style))
    story.append(Paragraph("1. <b>Outcome Alignment:</b> AI-driven goals agreed with CFO.", body_style))
    story.append(Paragraph("2. <b>Data Assessment:</b> Proprietary analysis of readiness.", body_style))
    story.append(Paragraph("3. <b>Automated Delivery:</b> AI agents cut timelines by 40%.", body_style))
    story.append(Paragraph("4. <b>Continuous Optimisation:</b> Governance prevents decay.", body_style))

    story.append(Paragraph("<b>Competitive Landscape</b>", h2_style))
    story.append(Paragraph("• <b>Traditional Consulting:</b> Expensive, manual, slow.", body_style))
    story.append(Paragraph("• <b>Software Vendors:</b> Focus on sales, not outcomes.", body_style))
    story.append(Paragraph("• <b>AI-First Solutions:</b> Lack finance domain expertise.", body_style))

    story.append(PageBreak())

    # PRODUCT & TECH
    story.append(Paragraph("Product & Technology", h1_style))
    story.append(Paragraph("<b>What AxionX Does</b>", h2_style))
    story.append(Paragraph("We identify hidden data quality issues before implementation begins (the root cause of 50% of failures). Our AI agents automate documentation and testing.", body_style))
    
    story.append(Paragraph("<b>The Difference</b>", h2_style))
    story.append(Paragraph("• <b>Predictive:</b> We find failure patterns before we start.", body_style))
    story.append(Paragraph("• <b>Integrated:</b> Assessment insights feed execution.", body_style))
    story.append(Paragraph("• <b>Network Effect:</b> Every implementation strengthens our AI models.", body_style))

    story.append(Paragraph("<b>MVP Plan</b>", h2_style))
    story.append(Paragraph("Phase 1: Data Quality Assessment Engine using Python/Django and OpenAI API. Budget: £120k-£150k.", body_style))

    # GTM
    story.append(Paragraph("Go-To-Market", h1_style))
    story.append(Paragraph("<b>Target (ICP):</b> Mid-Market Manufacturing & Distribution (£10m-£500m Revenue).", body_style))
    story.append(Paragraph("<b>Personas:</b> CFO (wants accuracy) and Head of IT (hates integration nightmares).", body_style))
    story.append(Paragraph("<b>Strategy:</b> Direct network (16 recent implementations) + Partner referrals (OneStream, Oracle, SAP).", body_style))

    story.append(PageBreak())

    # TEAM
    story.append(Paragraph("Founder & Team", h1_style))
    story.append(Paragraph("<b>Founder Profile: 15 Years Experience.</b>", h2_style))
    story.append(Paragraph("From plumber to global EPM leader. Turned around Black Diamond Advisory from £200k monthly loss to £600k profit in 12 months.", body_style))
    story.append(Paragraph("• <b>Achievements:</b> 53 EPM implementations. Built global BD models.", body_style))
    story.append(Paragraph("• <b>Why me:</b> Domain knowledge. Network. Proven execution.", body_style))
    
    story.append(Paragraph("<b>Hiring Plan</b>", h2_style))
    story.append(Paragraph("Month 3: Founding Engineer. Month 9: Ops Manager. Month 12: Prompt Engineer.", body_style))

    # Build
    doc.build(story)
    print(f"PDF generated: {filename}")

if __name__ == "__main__":
    create_axionx_overview()