"use client";

import Link from "next/link";

export default function TermsPage() {

    return (
        <div className="bg-white">

            {/* HEADER */}

            <section className="bg-gradient-to-b from-white to-wellness-bg py-20 border-b border-gray-100">

                <div className="max-w-5xl mx-auto px-6 text-center pt-12">

                    <h1 className="text-4xl md:text-5xl font-semibold text-navy-dark">
                        Terms & Conditions
                    </h1>

                    <p className="mt-4 text-sm text-navy/60">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <p className="mt-6 text-navy/90 max-w-2xl mx-auto text-md leading-relaxed">
                        These Terms & Conditions govern your use of the Healora platform,
                        including all telehealth consultations, services, and digital
                        resources provided through the platform.
                    </p>

                </div>

            </section>


            {/* CONTENT */}

            <section className="py-20">

                <div className="max-w-4xl mx-auto px-6 space-y-14 text-md leading-relaxed text-navy/80">

                    {/* INTRO */}

                    <div className="space-y-4">

                        <p>
                            We may engage third-party companies and individuals to facilitate our
                            Service, provide it on our behalf, perform related tasks, or assist us
                            in analyzing the usage of our Service.
                        </p>

                        <p>
                            These third parties will have access to your Personal Information solely
                            to execute these tasks for us and are obligated to keep it confidential
                            and not use it for any other purpose.
                        </p>

                        <p>
                            The security of your Personal Information is crucial to us. However,
                            please remember that no method of transmission over the Internet or
                            electronic storage is entirely secure. While we strive to use
                            commercially acceptable measures to protect your Personal Information,
                            we cannot guarantee its complete security.
                        </p>

                    </div>


                    {/* GENERAL TERMS */}

                    <Section title="General Terms">

                        <ul className="list-disc text-md pl-5 space-y-2">

                            <li>Rates are subject to change without notice.</li>

                            <li>
                                Certain situations or emergencies may necessitate a referral to a
                                specialist or hospital.
                            </li>

                            <li>We do not guarantee a cure.</li>

                            <li>
                                Healora reserves the right to terminate members from its program for
                                any reason, including non-payment. Healora will not be liable for
                                any loss or damage resulting from the termination. We may suspend
                                or terminate access to our Service immediately, without prior
                                notice or liability, for any reason, including if you violate the
                                Terms.
                            </li>

                            <li>
                                We reserve the right to modify or replace these Terms at our
                                discretion without prior notice. By continuing to access or use
                                our Service after these changes take effect, you agree to be
                                bound by the revised terms. If you do not agree to the new terms,
                                please cease using the Service.
                            </li>

                        </ul>

                    </Section>

                    {/* ELIGIBILITY */}

                    <Section title="Eligibility & Accounts">

                        <p>
                            Users must be 18 years or older. Minors under 18 may only use the
                            Platform under the supervision of a parent or legal guardian, who
                            will be considered the User.
                        </p>

                        <p>
                            Registration requires accurate, complete, and current information.
                            You are responsible for safeguarding your account credentials and
                            all activities under your account, and you must promptly notify
                            Healora Wellness Centre of any unauthorized use.
                        </p>

                        <p>
                            If the registration information is found to be inaccurate,
                            incomplete, or misleading, Healora may suspend or terminate access.
                        </p>

                    </Section>


                    {/* ELECTRONIC SIGNATURE */}

                    <Section title="Electronic Signature & Contract Acceptance">

                        <p>
                            By accessing, registering on, or using the Platform, or by clicking
                            "Agree," "Continue," "Submit," or similar buttons, you acknowledge
                            that this action constitutes a valid electronic signature and
                            legally binding consent under:
                        </p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>the Information Technology Act, 2000 (India)</li>
                            <li>UETA & ESIGN Act (United States) where applicable</li>
                            <li>eIDAS Regulation (EU) where applicable</li>
                        </ul>

                        <p>
                            Such acceptance forms a valid, enforceable contract between you and
                            Healora Wellness Centre. Users agree that no physical or ink
                            signature is necessary.
                        </p>

                    </Section>


                    {/* TELEMEDICINE */}

                    <Section title="Telemedicine Nature & Medico-Legal Exclusion">

                        <p>
                            Healora Wellness Centre offers tele-consultation services
                            exclusively. All consultations, advisories, recommendations,
                            prescriptions, and care plans provided through the Platform are
                            intended solely for telehealth guidance and do not constitute
                            medico-legal, forensic, insurance, court, fitness-for-duty,
                            disability, or legal medical opinions, nor do they substitute for
                            a physical examination where required.
                        </p>

                        <p>
                            Clients agree not to use any Healora Wellness Centre consultation,
                            prescription, or report for medico-legal, court, police,
                            employment legal defense, litigation, disability certification,
                            insurance claims, medical leave disputes, or regulatory
                            proceedings.
                        </p>

                    </Section>


                    {/* DATA PROTECTION */}

                    <Section title="Data Protection & Data Usage Compliance">

                        <ul className="list-disc pl-5 space-y-3">

                            <li>
                                <strong>Role:</strong> Healora acts as a Data Fiduciary for personal and
                                sensitive data processed for service delivery, regulatory compliance,
                                fraud prevention, and other lawful purposes.
                            </li>

                            <li>
                                <strong>User Rights:</strong> Subject to the law, Users may request
                                access, correction, erasure, and withdraw consent prospectively, and
                                seek grievance redressal. Healora may retain certain data for legal,
                                regulatory, or security purposes even after deletion requests.
                            </li>

                            <li>
                                <strong>Personal & Sensitive Personal Data:</strong> Personal Data may
                                include name, address, contact details, date of birth, photograph,
                                and other identifiers. Sensitive Personal Data may include financial
                                information, health data, sexual orientation, biometrics, genetic
                                data, and government identifiers.
                            </li>

                            <li>
                                <strong>Children's Data:</strong> We process personal data of children
                                (under 18) only with verifiable parental or guardian consent;
                                guardians may exercise rights on behalf of the child.
                            </li>

                            <li>
                                <strong>Retention & Deletion:</strong> Data is retained only as
                                necessary for stated purposes and as required by law, tax, or
                                dispute-resolution. Where applicable, session metadata and necessary
                                clinical records may be retained for lawful record-keeping and
                                safety, subject to confidentiality. A high-level retention and
                                deletion schedule is available upon request.
                            </li>

                            <li>
                                <strong>Cross-Border Processing:</strong> Data may be processed outside
                                of India, subject to applicable laws and government notifications;
                                contractual safeguards ensure protection similar to Indian law.
                            </li>

                            <li>
                                <strong>Timelines:</strong> Healora endeavors to respond to data rights
                                requests within 15 working days or as prescribed by law, subject to
                                identity verification.
                            </li>

                            <li>
                                <strong>Breach Notification:</strong> In the event of a personal data
                                breach likely to cause significant harm, Healora will notify the Data
                                Protection Board of India and affected Data Principals as required
                                by law and will take remedial actions.
                            </li>

                            <li>
                                <strong>Cookies & Direct Marketing:</strong> The Platform utilizes
                                cookies for functionality and analytics. Marketing communications
                                (SMS, voice, email) are sent only with consent, in accordance with
                                TRAI/DND regulations. Users can opt-out via message controls or
                                account settings; essential service messages may still be sent.
                            </li>

                            <li>
                                <strong>Explicit Consent for Sensitive Personal Data:</strong> Users
                                provide explicit consent for Healora to collect, store, process, and
                                share Sensitive Personal Data with engaged processors in accordance
                                with applicable law and these Terms.
                            </li>

                        </ul>

                    </Section>


                    <Section title="Employer Programs (EAP)">

                        <p>
                            When Services are provided under a corporate Employee Assistance
                            Program, the Client consents to Healora sharing only anonymized and
                            aggregated utilization data with the employer, except in cases where:
                        </p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>There is an immediate risk to life or safety, or</li>
                            <li>Disclosure is required by applicable law.</li>
                        </ul>

                    </Section>


                    {/* GLOBAL COMPLIANCE */}

                    <Section title="Global Compliance, HIPAA & GDPR Alignment">

                        <p>
                            Healora Wellness Centre primarily operates under Indian law,
                            including the Digital Personal Data Protection Act (DPDP Act).
                        </p>

                        <p>
                            For international Clients and corporate users, Healora adopts
                            reasonable administrative, physical, and technical safeguards
                            aligned with global privacy and data protection frameworks,
                            including:
                        </p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>HIPAA privacy and security principles (United States)</li>
                            <li>GDPR lawful processing and data minimization (EU/EEA)</li>
                            <li>ISO/IEC 27001 information security practices</li>
                        </ul>

                    </Section>


                    <Section title="HIPAA Applicability">

                        <p>
                            Healora implements HIPAA-aligned confidentiality practices where
                            necessary. However, HIPAA obligations do not legally apply unless
                            a written Business Associate Agreement (BAA) is executed with the
                            relevant enterprise partner.
                        </p>

                    </Section>


                    <Section title="GDPR Applicability">

                        <p>
                            GDPR obligations apply only when processing involves EU data
                            subjects and only to that limited scope. When GDPR applies,
                            Healora will:
                        </p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                Process data based on consent, contractual obligations,
                                or legitimate legal interest.
                            </li>

                            <li>
                                Support access, correction, and erasure requests to the
                                extent legally permissible.
                            </li>

                            <li>
                                Transfer data only with lawful safeguards, including
                                Standard Contractual Clauses (SCCs), encryption, or
                                explicit consent where applicable.
                            </li>
                        </ul>

                        <p>
                            If there is a conflict between the DPDP Act and GDPR, the
                            standard providing greater user protection will apply to the
                            extent commercially and legally feasible.
                        </p>

                        <p>
                            Healora does not sell personal data, Protected Health
                            Information (PHI), or behavioral health information in
                            any jurisdiction.
                        </p>

                    </Section>


                    <Section title="Responsible AI Usage & PHI Restrictions">

                        <p>
                            Healora may utilize de-identified, anonymized, and aggregated
                            data to enhance service delivery, triage systems, clinical
                            decision support, AI safety systems, and product analytics.
                        </p>

                        <p>
                            PHI, clinical notes, and identifiable mental health or medical
                            content will not be used for AI training without explicit
                            written consent.
                        </p>

                        <p>
                            Healora does not sell PHI or share identifiable user data
                            with AI vendors.
                        </p>

                    </Section>


                    <Section title="AI Usage & Client Responsibility">

                        <p>
                            AI tools (if used) are intended for support only. AI does not replace
                            licensed professionals.
                        </p>

                        <p>
                            Users should not rely solely on AI outputs for medical decisions or
                            in emergency conditions.
                        </p>

                        <p>
                            Users must not attempt to manipulate or misuse AI systems to obtain
                            controlled medications, misrepresent personal health status, or
                            generate false medical documentation.
                        </p>

                    </Section>


                    <Section title="Intellectual Property Rights">

                        <p>
                            All material contained on this website, including but not limited to
                            text and graphics, is protected by copyright or similar rights of
                            Healora, unless otherwise expressly stated.
                        </p>

                        <p>
                            Healora Wellness Centre reserves the rights and strictly prohibits
                            any unauthorized use or duplication. Any statutorily authorized
                            rights to print or download are strictly limited to your personal
                            use. No material may be used for any commercial purpose.
                        </p>

                        <p>
                            Any copies of this website saved by any means may only be used for
                            subsequent viewing or to print extracts for personal use.
                        </p>

                        <p>
                            Unless otherwise expressly permitted in writing, you may not create
                            a database of these web pages in any form.
                        </p>

                    </Section>

                    <Section title="About Healora Team">

                        <ul className="list-disc pl-5 space-y-4">

                            <li>
                                <strong>Humanity, Integrated:</strong> At Healora, we believe healthcare
                                should not feel like a puzzle. For too long, individuals have had to
                                navigate a fragmented system—visiting one place for physical health,
                                another for mental support, and yet another for wellness advice. We
                                recognized the need for a more human-centered approach, and thus,
                                Healora was established.
                            </li>

                            <li>
                                <strong>One Umbrella, Total Care:</strong> Healora is an innovative
                                online consultation hub designed to unite multiple health service
                                sectors under one roof. By integrating counselling, psychotherapy,
                                and medical expertise, we’ve created a seamless ecosystem where
                                your mind and body are treated as one. We are not just a platform;
                                we are a community dedicated to fostering human well-being.
                            </li>

                            <li>
                                <strong>Our Mission:</strong> Improving Your Quality of Life.
                            </li>

                            <li>
                                <strong>Our Goal:</strong> To make high-quality care accessible to
                                everyone, everywhere. We believe that mental resilience is the
                                foundation of a fulfilling life. Through our expert-led sessions,
                                we assist you in:
                            </li>

                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>Navigating life’s challenges:</strong> From daily stressors
                                    to deep-seated emotional hurdles.
                                </li>
                                <li>
                                    <strong>Breaking the stigma:</strong> Making mental health support
                                    as routine and accessible as a regular check-up.
                                </li>
                                <li>
                                    <strong>Empowering growth:</strong> Providing the necessary tools
                                    for a more intentional, balanced, and fulfilling life.
                                </li>
                            </ul>

                        </ul>

                    </Section>

                    {/* PRIMARY AIM */}

                    <div className="rounded-2xl bg-wellness-bg border border-teal-100 px-6 py-6 text-center">

                        <h2 className="text-xl md:text-2xl font-semibold text-navy-dark leading-relaxed">
                            OUR PRIMARY AIM IS TO ENSURE YOU CONTINUE YOUR TREATMENT WITHOUT
                            INTERRUPTION, WHICH IS BENEFICIAL FOR YOUR HEALTH.
                        </h2>

                    </div>


                    {/* REFUND POLICY */}

                    <Section title="Refund Policy">

                        <ul className="list-disc pl-5 space-y-3">

                            <li>
                                The commencement of treatment confirms that the patient has
                                accepted this Refund Policy.
                            </li>

                            <li>
                                There will be no refunds for any consultation fees or medication sent.
                            </li>

                            <li>
                                In the event of damaged medication during delivery, it will be
                                resent upon submission of a complaint and proof.
                            </li>

                        </ul>

                    </Section>


                    {/* PRICING POLICIES */}

                    <Section title="Pricing Policies">

                        <p>
                            All prices are subject to change without prior notice and are not
                            guaranteed, except for prices of orders accepted by Healora Wellness
                            Centre.
                        </p>

                        <p>
                            The stated prices do not include any sales, use, or excise tax or any
                            other tax, duty, or charge currently in effect or that may be imposed
                            by any state or authority.
                        </p>

                        <p>
                            All such taxes, duties, or charges shall be paid by the Buyer unless
                            an exemption certificate acceptable to the appropriate authorities is
                            provided.
                        </p>

                        <p>
                            Healora reserves the right to refuse orders submitted and is not bound
                            to fulfill any orders until they have been accepted.
                        </p>

                    </Section>


                    {/* IDEAS */}

                    <Section title="Ideas">

                        <p>
                            Patients and Users are welcome to share their ideas or suggestions
                            for improvements based on their observations while visiting the
                            website or clinics for treatment.
                        </p>

                        <p>
                            The application of these ideas or suggestions is at the discretion
                            of Healora authorities.
                        </p>

                    </Section>


                    {/* COPYRIGHT LAWS */}

                    <Section title="Copyright Laws">

                        <p>
                            The information collected by Healora Wellness Centre directly or
                            indirectly from the patient shall belong to Healora.
                        </p>

                        <p>
                            Copying copyrighted content published by Healora on the website for
                            commercial purposes or profit will violate copyright, and Healora
                            reserves the right to take action under applicable law accordingly.
                        </p>

                        <p>
                            The contents of the website, including information, text, graphics,
                            images, logos, design, and overall content, are the property of
                            Healora and are protected under copyright, trademark, and other
                            applicable laws.
                        </p>

                        <p>
                            Patients or users must not modify Healora content or reproduce,
                            display, publicly perform, distribute, or use Healora content in
                            any way for any public or commercial purpose or for personal gain.
                        </p>

                    </Section>


                    {/* TERMINATION & BLACKLISTING */}

                    <Section title="Termination & Blacklisting">

                        <p>
                            Healora Wellness Centre may suspend or terminate access with or
                            without notice if:
                        </p>

                        <ul className="list-disc pl-5 space-y-2">

                            <li>Terms are violated</li>

                            <li>User information cannot be authenticated</li>

                            <li>Continued membership is not in Healora's best interests</li>

                            <li>Third-party rights are violated</li>

                            <li>
                                Healora receives a credible third-party report of rights
                                violations or unlawful activity attributable to the User's
                                use of the Services
                            </li>

                        </ul>

                        <p>
                            Users may not re-register without Healora's express consent.
                            Healora may delete User information at its discretion, subject
                            to legal obligations.
                        </p>

                        <p>
                            Automatic termination grounds include contact-sharing or
                            solicitation, session recording, harassment, threats, abuse,
                            payment fraud, emergency-risk misconduct, platform misuse,
                            and DPDP violations.
                        </p>

                    </Section>


                    {/* BLACKLISTING & SECURITY RETENTION */}

                    <Section title="Blacklisting & Security Retention">

                        <p>
                            Healora may securely retain minimal identifiers to prevent
                            re-registration by Users or Providers terminated for fraud,
                            abuse, data misuse, or safety risks.
                        </p>

                    </Section>


                    {/* SURVIVAL */}

                    <Section title="Survival">

                        <p>
                            Clauses regarding confidentiality, PHI handling, platform
                            exclusivity, non-circumvention, intellectual property,
                            payments, indemnity, limitations, governing law, dispute
                            resolution, data protection, blacklisting, security retention,
                            and survival shall endure termination.
                        </p>

                    </Section>


                    {/* ACCOUNT DELETION */}

                    <Section title="Account Deletion by User">

                        <p>
                            A User may request account deletion or termination in
                            accordance with the Privacy Policy and applicable law.
                        </p>

                    </Section>


                    {/* THIRD PARTY LINKS */}

                    <Section title="Third-Party Links & Sponsored Content">

                        <p>
                            External links and sponsored content may appear on the
                            Platform. Healora is not responsible for the accuracy of
                            content or claims and does not endorse those sites or
                            services.
                        </p>

                    </Section>


                    {/* FEEDBACK */}

                    <Section title="Feedback">

                        <p>
                            This website and the emails you receive may include surveys
                            seeking your feedback on the services provided by Healora.
                            This information is used to enhance our services and identify
                            improvements.
                        </p>

                        <p>
                            By providing Healora with any information or ideas, you
                            acknowledge that Healora is free to use this feedback for any
                            purpose without compensation to you.
                        </p>

                    </Section>


                    {/* MISCELLANEOUS */}

                    <Section title="Miscellaneous">

                        <ul className="list-disc pl-5 space-y-3">

                            <li>
                                <strong>Severability:</strong> If any provision is determined
                                to be invalid or unenforceable, it shall be severed, and
                                the remainder shall continue in full force.
                            </li>

                            <li>
                                <strong>Waiver:</strong> No term is waived or amended except
                                by written consent from the affected party. Any waiver
                                applies only to the specific instance and is not ongoing.
                            </li>

                            <li>
                                <strong>Entire Agreement:</strong> These Terms and the
                                Privacy Policy represent the complete agreement regarding
                                the use of the Platform, superseding all prior
                                communications.
                            </li>

                            <li>
                                <strong>AI-Assisted Support Notice:</strong> Healora may
                                utilize AI tools for triage, guidance, content support,
                                solicitation monitoring, and self-help automation; AI
                                does not replace licensed professionals.
                            </li>

                            <li>
                                <strong>Research & Service Improvement:</strong> With
                                consent, de-identified or anonymized data may be
                                processed for quality improvement, analytics, or
                                research in accordance with the DPDP Act.
                            </li>

                            <li>
                                <strong>Order of Precedence:</strong> In the event of a
                                conflict, the applicable corporate agreement (if any)
                                will take precedence over these Terms, which will,
                                in turn, prevail over the Privacy Policy, solely to
                                the extent of the conflict.
                            </li>

                        </ul>

                    </Section>

                    {/* CONTACT */}

                    <div className="pt-10 border-t border-gray-100 text-center">

                        <p className="text-navy/70">
                            For questions regarding these Terms, please contact
                            Healora Wellness Centre.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-4 inline-block text-teal-600 font-medium hover:underline"
                        >
                            Contact Support
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}


function Section({ title, children }: any) {
    return (
        <div className="space-y-4">

            <h2 className="text-xl font-semibold text-navy-dark">
                {title}
            </h2>

            {children}

        </div>
    );
}