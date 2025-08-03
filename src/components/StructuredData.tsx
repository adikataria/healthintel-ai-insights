
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'product' | 'service' | 'faq' | 'organization' | 'website';
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    const baseUrl = 'https://doclumen.com';
    
    switch (type) {
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "DocLumen AI Health Analytics",
          "description": "AI-powered health analytics platform for lab report analysis and personalized health insights",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "2500"
          },
          "author": {
            "@type": "Organization",
            "name": "DocLumen"
          }
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalWebsite",
          "name": "DocLumen",
          "url": baseUrl,
          "description": "Professional AI-powered health analytics and medical consultation services",
          "provider": {
            "@type": "Organization",
            "name": "DocLumen",
            "url": baseUrl
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Health Analytics Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Lab Report Analysis",
                  "description": "Instant AI-powered analysis of medical lab reports"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Doctor Assistant",
                  "description": "24/7 AI-powered medical consultation"
                }
              }
            ]
          }
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How accurate is DocLumen AI analysis?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DocLumen AI provides 90% accuracy in lab report analysis, validated by medical professionals and continuous learning from medical data."
              }
            },
            {
              "@type": "Question",
              "name": "Is my health data secure on DocLumen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, DocLumen uses end-to-end encryption and follows HIPAA-equivalent standards. Your data is completely secure and private."
              }
            },
            {
              "@type": "Question",
              "name": "Can I use DocLumen for emergency medical situations?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DocLumen is for informational purposes only. For medical emergencies, always contact emergency services or visit the nearest hospital immediately."
              }
            }
          ]
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "DocLumen",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "description": "Leading AI-powered health analytics platform providing instant medical report analysis and personalized health insights",
          "foundingDate": "2024",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXX-XXX-XXXX",
            "contactType": "Customer Service",
            "availableLanguage": ["English", "Hindi"]
          },
          "sameAs": [
            "https://twitter.com/doclumen",
            "https://linkedin.com/company/doclumen",
            "https://facebook.com/doclumen"
          ]
        };

      default:
        return data || {};
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
