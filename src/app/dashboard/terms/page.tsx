import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Terms of Service</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>GiveNtake.world Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-sm text-muted-foreground mb-4">
            Last Updated: January 1, 2024
          </p>

          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold">1. INTRODUCTION</h3>
              <p>
                Welcome to GiveNtake.world. These Terms of Service govern your use of our platform and services. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">2. DEFINITIONS</h3>
              <p>
                <strong>"Platform"</strong> refers to the GiveNtake.world website and services.<br />
                <strong>"User", "You", "Your"</strong> refers to individuals who access or use the Platform.<br />
                <strong>"We", "Us", "Our"</strong> refers to GiveNtake.world.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">3. ACCOUNT REGISTRATION</h3>
              <p>
                To use certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">4. GIVE AND RECEIVE HELP SERVICES</h3>
              <p>
                Our platform facilitates the giving and receiving of help between users. All transactions are subject to the following conditions:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Users must be at least 18 years old to participate in giving or receiving help.</li>
                <li>We do not guarantee the success or completion of any transaction.</li>
                <li>Users are responsible for verifying the identity and legitimacy of other users before engaging in transactions.</li>
                <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">5. FEES AND PAYMENTS</h3>
              <p>
                We may charge fees for certain services. All fees are non-refundable unless otherwise stated. Payment terms are specified during the transaction process.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">6. PRIVACY POLICY</h3>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Platform, you consent to our collection and use of your data as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">7. PROHIBITED ACTIVITIES</h3>
              <p>
                You agree not to engage in any of the following activities:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Violating any applicable laws or regulations.</li>
                <li>Impersonating any person or entity.</li>
                <li>Engaging in fraudulent transactions.</li>
                <li>Interfering with the proper functioning of the Platform.</li>
                <li>Attempting to access unauthorized areas of the Platform.</li>
                <li>Harassing, threatening, or intimidating other users.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">8. TERMINATION</h3>
              <p>
                We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">9. LIMITATION OF LIABILITY</h3>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from or in connection with your use of or inability to use the Platform.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">10. CHANGES TO TERMS</h3>
              <p>
                We may modify these Terms at any time. Your continued use of the Platform after any changes indicates your acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">11. CONTACT US</h3>
              <p>
                If you have any questions about these Terms, please contact us at:<br />
                Email: info@giventake.world<br />
                Phone: +91 9846 073366
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
