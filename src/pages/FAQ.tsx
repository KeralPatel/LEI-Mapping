
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

interface FAQProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const FAQ: React.FC<FAQProps> = ({ isDarkMode, onThemeToggle }) => {

  const [showInstallationInstructions, setShowInstallationInstructions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Download extension zip file from Google Drive
  const handleDownloadExtension = async () => {
    setIsDownloading(true);
    
    // Google Drive file ID from the provided URL
    const fileId = '1AlOwMByT5Bb_Oz2TLD7KD5PParKUx581';
    
    // Try fetch method first (works if CORS allows)
    try {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`;
      
      const response = await fetch(downloadUrl, {
        method: 'GET',
        redirect: 'follow',
        mode: 'cors'
      });

      if (response.ok) {
        const blob = await response.blob();
        
        // Check if we got the actual file (not HTML error page)
        if (blob.size > 1000 && !blob.type.includes('text/html')) {
          // Create download link
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'signify-extension.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          setIsDownloading(false);
          return;
        }
      }
    } catch (fetchError) {
      console.log('Fetch method failed (likely CORS issue), using direct link method:', fetchError);
    }

    // Fallback: Use direct link click (most reliable for Google Drive, bypasses CORS)
    // Note: download attribute doesn't work for cross-origin, but Google Drive will handle the download
    const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`;
    
    // Use direct link method (works reliably for Google Drive)
    const link = document.createElement('a');
    link.href = downloadLink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsDownloading(false);
  };
  
  const faqs = [
    {
      id: "1",
      question: "What is the difference between Decentralized and Knightsbridge routes?",
      answer: "The Decentralized route offers a fully autonomous token launch process, while the Knightsbridge Approved route provides additional compliance, legal structuring, and professional vetting services for a more secure and regulated approach."
    },
    {
      id: "2",
      question: "How long does the token creation process take?",
      answer: "For Decentralized launches, tokens can be created within 24-48 hours. Knightsbridge Approved processes typically take 2-4 weeks due to additional compliance and legal review requirements."
    },
    {
      id: "3",
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods including Stripe (credit/debit cards), USDT (cryptocurrency), and Bitcoin for maximum flexibility."
    },
    {
      id: "4",
      question: "Do you provide legal documentation?",
      answer: "Yes, both routes offer legal documentation services. The Knightsbridge route includes comprehensive legal structuring, while the Decentralized route offers optional legal document packages."
    },
    {
      id: "5",
      question: "Can you help with exchange listings?",
      answer: "Absolutely! We provide exchange listing services for both centralized and decentralized exchanges, helping you get your token listed on major trading platforms."
    },
    {
      id: "6",
      question: "What blockchain networks do you support?",
      answer: "We support multiple blockchain networks including Ethereum, Binance Smart Chain, Polygon, and other EVM-compatible networks. Custom blockchain requirements can be discussed during consultation."
    },
    {
      id: "7",
      question: "Do you provide ongoing support after token launch?",
      answer: "Yes, we offer post-launch support including technical assistance, marketing guidance, and additional services to help ensure your project's success."
    },
    {
      id: "8",
      question: "What documents do I need to prepare?",
      answer: "Required documents vary by route. Generally, you'll need business plans, KYC documentation, and any relevant legal documents. Our platform will guide you through the specific requirements for your chosen path."
    },
    {
      id: "9",
      question: "How does Knightsbridge integrate with my existing ERP?",
      answer: "It doesn't, no API exists at this time."
    },
    {
      id: "10",
      question: "What support options are available?",
      answer: "Email support is available via the Contact us page, we are open 5 days a week and will respond as soon as possible."
    },
    {
      id: "11",
      question: "Is Lot Switch compatible with all blockchains?",
      answer: "Yes, currently the Protocol supports only the Knightsbridge Chain. Custom integrations for private chains or major chains can be done, please contact us for more information."
    },
    {
      id: "12",
      question: "How secure is the mapping process against data breaches?",
      answer: "Extremely secure—the protocol employs end-to-end encryption, to ensure your LEI verification is as secure as possible."
    },
    {
      id: "13",
      question: "Can I use the LEI mapping without blockchain expertise?",
      answer: "Absolutely. Our no-code dashboard and guided onboarding make it accessible for non-technical users. Training modules are available upon request."
    },
    {
      id: "14",
      question: "What happens if my verification fails?",
      answer: "Failures usually means something is wrong with you LEI credentials, please reach out to your LEI provider for more information."
    },
    {
      id: "15",
      question: "Does Knightsbridge comply with industry regulations?",
      answer: "Yes, it's designed to meet the European Blockchains Sandbox regulators standard and with their input."
    }
  ];

  return (
    <div className={`w-full min-h-screen relative overflow-x-hidden bg-bg-primary ${!isDarkMode ? 'light' : ''}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
      
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-16">

        <div className="text-center mb-12">
          <h1 className="text-text-primary text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our tokenization services and processes.
          </p>
        </div>

        <div className="bg-bg-secondary border border-border-primary rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-border-primary">
                <AccordionTrigger className="text-left text-text-primary hover:text-blue-400 text-lg font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>



        
        {/* Signify Extension Section */}
				<section className="w-full flex justify-center px-4 md:px-8 lg:px-16 mb-20 mt-20">
					<div className="w-full max-w-4xl">
						<div className="border border-text-secondary rounded-lg p-8 bg-bg-secondary">
							<div className="text-center mb-8">
								<h2 className="text-text-primary text-2xl md:text-3xl font-medium mb-4">
									Download Signify Extension
								</h2>
								<p className="text-text-secondary text-base md:text-lg">
									Enhance your tokenization experience with our browser extension
								</p>
							</div>

							{/* Download Button */}
							<div className="flex justify-center mb-8">
								<button 
									onClick={handleDownloadExtension}
									disabled={isDownloading}
									className="group px-8 py-4 bg-text-primary text-bg-primary rounded-lg text-lg font-medium hover:bg-text-secondary transition-all duration-200 flex items-center justify-center gap-3 min-w-[250px] disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<Download className="w-5 h-5" />
									{isDownloading ? 'Downloading...' : 'Download Extension'}
								</button>
							</div>

							{/* Installation Instructions Toggle */}
							<div className="text-center">
								<button
									onClick={() => setShowInstallationInstructions(!showInstallationInstructions)}
									className="group flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-200 mx-auto"
								>
									<span className="text-base font-medium">How to Install Signify</span>
									{showInstallationInstructions ? (
										<ChevronUp className="w-4 h-4 group-hover:translate-y-[-1px] transition-transform duration-200" />
									) : (
										<ChevronDown className="w-4 h-4 group-hover:translate-y-[1px] transition-transform duration-200" />
									)}
								</button>
							</div>

							{/* Installation Instructions */}
							{showInstallationInstructions && (
								<div className="mt-8 pt-8 border-t border-text-secondary">
									<h3 className="text-text-primary text-xl font-medium mb-6 text-center">
										Installation Instructions (for Google Chrome)
									</h3>
									
									<div className="space-y-6">
										<div className="flex flex-col md:flex-row gap-4">
											<div className="flex-shrink-0 w-8 h-8 bg-text-primary text-bg-primary rounded-full flex items-center justify-center text-sm font-medium">
												1
											</div>
											<div className="flex-1">
												<p className="text-text-secondary text-base leading-relaxed">
													After downloading and unzipping, open Chrome and navigate to <code className="bg-bg-primary px-2 py-1 rounded text-sm">chrome://extensions</code>.
												</p>
											</div>
										</div>

										<div className="flex flex-col md:flex-row gap-4">
											<div className="flex-shrink-0 w-8 h-8 bg-text-primary text-bg-primary rounded-full flex items-center justify-center text-sm font-medium">
												2
											</div>
											<div className="flex-1">
												<p className="text-text-secondary text-base leading-relaxed">
													Enable "Developer mode" using the toggle in the top-right corner.
												</p>
											</div>
										</div>

										<div className="flex flex-col md:flex-row gap-4">
											<div className="flex-shrink-0 w-8 h-8 bg-text-primary text-bg-primary rounded-full flex items-center justify-center text-sm font-medium">
												3
											</div>
											<div className="flex-1">
												<p className="text-text-secondary text-base leading-relaxed">
													Click the "Load unpacked" button that appears on the left.
												</p>
											</div>
										</div>

										<div className="flex flex-col md:flex-row gap-4">
											<div className="flex-shrink-0 w-8 h-8 bg-text-primary text-bg-primary rounded-full flex items-center justify-center text-sm font-medium">
												4
											</div>
											<div className="flex-1">
												<p className="text-text-secondary text-base leading-relaxed">
													Select the browser-extension folder you just downloaded.
												</p>
											</div>
										</div>
									</div>

									<div className="mt-8 pt-6 border-t border-text-secondary">
										<h4 className="text-text-primary text-lg font-medium mb-4">Configuration:</h4>
										
										<div className="space-y-4">
											<div className="flex flex-col md:flex-row gap-4">
												<div className="flex-shrink-0 w-6 h-6 bg-text-secondary text-bg-primary rounded-full flex items-center justify-center text-xs font-medium">
													1
												</div>
												<div className="flex-1">
													<p className="text-text-secondary text-base leading-relaxed">
														Once installed, click on the extension's icon in your browser toolbar to open it.
													</p>
												</div>
											</div>

											<div className="flex flex-col md:flex-row gap-4">
												<div className="flex-shrink-0 w-6 h-6 bg-text-secondary text-bg-primary rounded-full flex items-center justify-center text-xs font-medium">
													2
												</div>
												<div className="flex-1">
													<p className="text-text-secondary text-base leading-relaxed">
														Click the settings icon.
													</p>
												</div>
											</div>

											<div className="flex flex-col md:flex-row gap-4">
												<div className="flex-shrink-0 w-6 h-6 bg-text-secondary text-bg-primary rounded-full flex items-center justify-center text-xs font-medium">
													3
												</div>
												<div className="flex-1">
													<p className="text-text-secondary text-base leading-relaxed">
														In the "Vendor Url" field, paste the following URL: 
														<code className="bg-bg-primary px-2 py-1 rounded text-sm ml-2 break-all">
															https://api.npoint.io/53b6f17fceb96be39865
														</code>
													</p>
												</div>
											</div>

											<div className="flex flex-col md:flex-row gap-4">
												<div className="flex-shrink-0 w-6 h-6 bg-text-secondary text-bg-primary rounded-full flex items-center justify-center text-xs font-medium">
													4
												</div>
												<div className="flex-1">
													<p className="text-text-secondary text-base leading-relaxed">
														Click "Load and Save".
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>


        <div className="text-center mt-12">
          <p className="text-text-secondary text-lg mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Contact Us
          </a>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
