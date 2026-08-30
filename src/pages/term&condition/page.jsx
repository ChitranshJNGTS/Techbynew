import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsAndConditions() {
return (
<> <Navbar />

  <section className="bg-slate-950 min-h-screen pt-28 pb-20">
    <div className="max-w-6xl mx-auto px-6">

      {/* Hero */}

      <div className="text-center mb-16">

        <span className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-5">
          Legal Information
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Terms & Conditions
        </h1>

        <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg leading-8">
          Please read these Terms & Conditions carefully before using
          TechBy. By accessing or using our website, you acknowledge that
          you have read, understood, and agreed to these terms.
        </p>

        <p className="text-slate-500 mt-6">
          Last Updated: August 2026
        </p>

      </div>

      <div className="space-y-8">

        {/* 1. Acceptance */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            1. Acceptance of Terms
          </h2>

          <p className="text-slate-300 leading-8">
            By accessing or using TechBy, you agree to comply with these
            Terms & Conditions. If you do not agree with any part of these
            terms, please discontinue using the website.
          </p>

        </div>

        {/* 2. About TechBy */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            2. About TechBy
          </h2>

          <p className="text-slate-300 leading-8">
            TechBy is a job opportunity platform that helps users discover
            and access available employment opportunities from companies,
            recruiters, and other publicly available sources.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            TechBy is not an employer and does not directly provide
            employment to users unless explicitly stated for a particular
            opportunity.
          </p>

        </div>

        {/* 3. Use of Website */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            3. Use of the Website
          </h2>

          <p className="text-slate-300 leading-8 mb-4">
            Users may use TechBy to browse and discover job opportunities
            for legitimate employment purposes.
          </p>

          <ul className="space-y-4 text-slate-300">

            <li>
              • You must not use the website for unlawful purposes.
            </li>

            <li>
              • You must not attempt to damage, disrupt, or interfere with
              the website.
            </li>

            <li>
              • You must not use automated methods to abuse or overload
              the website.
            </li>

            <li>
              • You must not attempt to gain unauthorized access to any
              part of the website or its systems.
            </li>

          </ul>

        </div>

        {/* 4. Job Listings */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            4. Job Listings
          </h2>

          <p className="text-slate-300 leading-8">
            TechBy publishes job opportunities from companies,
            recruiters, publicly available sources, and other legitimate
            sources to help users discover employment opportunities.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            While we make reasonable efforts to keep job listings accurate
            and updated, we do not guarantee that every job listing is
            completely accurate, current, or still available.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            Job seekers should independently verify the job title,
            company, salary, eligibility requirements, location,
            application process, and other details before applying.
          </p>

        </div>

        {/* 5. Applications */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            5. Job Applications
          </h2>

          <p className="text-slate-300 leading-8">
            TechBy may provide links or instructions that allow users to
            apply for job opportunities through external company
            websites, recruitment platforms, email addresses, or other
            application channels.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            TechBy does not guarantee that an employer will respond to an
            application, conduct an interview, or offer employment.
          </p>

        </div>

        {/* 6. External Links */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            6. External Websites and Links
          </h2>

          <p className="text-slate-300 leading-8">
            TechBy may contain links to external websites, company
            websites, recruitment platforms, or other third-party
            services.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            TechBy does not control or guarantee the availability,
            accuracy, security, or policies of external websites. Users
            should review the terms and privacy policies of external
            websites before providing personal information or applying
            for a job.
          </p>

        </div>

        {/* 7. Accuracy */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            7. Accuracy of Information
          </h2>

          <p className="text-slate-300 leading-8">
            We make reasonable efforts to provide useful and updated job
            information. However, job vacancies may be filled, closed,
            modified, or removed by employers at any time without notice.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            TechBy is not responsible for errors, omissions, outdated
            information, or changes made by employers or third-party
            sources.
          </p>

        </div>

        {/* 8. No Guarantee */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            8. No Employment Guarantee
          </h2>

          <p className="text-slate-300 leading-8">
            Finding or viewing a job opportunity through TechBy does not
            guarantee employment, an interview, selection, salary,
            promotion, or any other employment outcome.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            All hiring decisions are made independently by the respective
            employers or recruiters.
          </p>

        </div>

        {/* 9. Advertising */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            9. Advertisements
          </h2>

          <p className="text-slate-300 leading-8">
            TechBy may display advertisements from third-party advertising
            providers. Advertisements may link to external websites or
            services.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            TechBy is not responsible for the products, services, claims,
            or content provided by third-party advertisers. Users should
            independently evaluate any third-party offer before engaging
            with it.
          </p>

        </div>

        {/* 10. Website Availability */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            10. Website Availability
          </h2>

          <p className="text-slate-300 leading-8">
            We aim to keep TechBy available and functioning properly.
            However, we do not guarantee that the website will always be
            available, uninterrupted, error-free, or free from technical
            issues.
          </p>

        </div>

        {/* 11. Changes */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            11. Changes to These Terms
          </h2>

          <p className="text-slate-300 leading-8">
            TechBy may update these Terms & Conditions from time to time
            to reflect changes to our website, services, or legal
            requirements.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            Updated terms will be published on this page with a revised
            "Last Updated" date. Your continued use of the website after
            changes are published means you accept the updated terms.
          </p>

        </div>

        {/* 12. Contact */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            12. Contact Us
          </h2>

          <p className="text-slate-300 leading-8">
            If you have questions or concerns regarding these Terms &
            Conditions, please contact TechBy using the contact
            information provided on our website.
          </p>

        </div>

      </div>

    </div>
  </section>

  <Footer />
</>

);
}
