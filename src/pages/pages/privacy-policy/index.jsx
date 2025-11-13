import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import Office from "@/components/pages/contact/Office";

import MetaData from "@/components/common/MetaData";
import adminApi from "@/api/adminApi";
import { useEffect, useState } from "react";
import SocialLinksNavbar from "@/pages/homes/home-v2/SocialLinksNavbar";

const metaInformation = {
  title: "Contact | Quest Bloom Real Estate LLC",
};

const Contact = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch menu items from API (same logic as MainMenu)
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await adminApi.get("/appearance/menus", {
          params: {
            type: "header",
          },
        });

        setMenuItems(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items");
        // Fallback to default menu structure if API fails
        setMenuItems([
          { id: 1, name: "Home", page: "Home" },
          { id: 2, name: "Off-Plan", page: "Off-Plan" },
          { id: 3, name: "Buy", page: "Buy" },
          { id: 4, name: "Listings", page: "Listings" },
          { id: 5, name: "Rent", page: "Rent" },
          { id: 6, name: "Agents", page: "Agents" },
          { id: 7, name: "Who We Are", page: "Who we are" },
          { id: 8, name: "Contact Us", page: "Contact Us" },
        ]);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader menuItems={menuItems} error={error} />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu menuItems={menuItems} error={error} />
      {/* End Mobile Nav  */}
      <SocialLinksNavbar />

      {/* Our Contact With Map */}
      <section className="p-0">
        <div className="image-frame-contact-hero">
          <div className="contact-hero-dark-overlay"></div>
          <img
            className="contact-page-hero-image"
            src="/images/ourValue-main.jpeg"
            alt="London Eye, London, United Kingdom"
          />
        </div>
      </section>
      {/* End Our Contact With Map */}

      {/* Privacy Policy Section */}
      <section className="pt60 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="privacy-policy-content">
                <style>
                  {`.privacy-policy-content ul { list-style-type: disc; } .privacy-policy-content ul li { margin-left: 1.25rem; }`}{" "}
                </style>
                <h1
                  className="text-center fw-light"
                  style={{
                    color: "#5a4a3a",
                    fontSize: "2.5rem",
                    marginBottom: "3rem",
                  }}
                >
                  Privacy Policy
                </h1>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Quest Bloom Real Estate, our affiliates and subsidiaries
                    ("We" or Quest Bloom Real Estate) respect your privacy and
                    commit to protecting it through our compliance with the
                    practices described in this Privacy Policy. This Privacy
                    Policy describes our practices for collecting, using,
                    maintaining, protecting, and disclosing the personal data we
                    may collect from you or that you may provide when you visit
                    our websites or other digital properties, communications, or
                    forms that link or refer to this notice (our "Site"). This
                    Privacy Policy applies to the personal data collected
                    through our Site, regardless of the country where you are
                    located. The Site may include links to third-party websites,
                    plug-ins, services, social networks, or applications.
                    Clicking on those links or enabling those connections may
                    allow the third party to collect or share data about you. We
                    do not control these third-party websites, and we encourage
                    you to read the privacy notice of every website you visit.
                    Please read this Privacy Policy carefully to understand our
                    policies and practices for processing and storing your
                    personal data. By engaging with our Site, you accept and
                    consent to the practices described in this Privacy Policy.
                    This Privacy Policy may change from time to time. Your
                    continued engagement with our Site after any such revisions
                    indicates that you accept and consent to them, so please
                    check the Privacy Policy periodically for updates.
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Data we may collect about you
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "1rem",
                    }}
                  >
                    We collect and use different types of data from and about
                    you including:
                  </p>
                  <ul
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "3.5rem",
                    }}
                  >
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Personal data that we could reasonably use to directly or
                      indirectly identify you, such as your name, postal
                      address, email address, telephone number, user name or
                      other similar identifier or any other identifier we may
                      use to contact you online or offline ("personal data").
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Non-personal data that does not directly or indirectly
                      reveal your identity or directly relate to an identified
                      individual, such as demographic information, statistics,
                      or aggregated information. Statistical or aggregated data
                      does not directly identify a specific person, but we may
                      derive non-personal statistical or aggregated data from
                      personal data. For example, we may aggregate personal data
                      to calculate the percentage of users accessing a specific
                      Site feature.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Non-personal details about your Website interactions,
                      including the full Uniform Resource Locators (URLs),
                      clickstream information to, through, and from our Website
                      (including date and time), products viewed or searched
                      for; page response times, download errors, length of
                      visits to certain pages, page interaction information
                      (such as scrolling, clicks, and mouse-overs), or methods
                      used to browse away from the page.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Technical information, including the Internet protocol
                      (IP) address used to connect your computer to the
                      Internet, your login information, browser type and
                      version, time zone setting, browser plug-in types and
                      versions, or operating system and platform.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      If we combine or connect non-personal, demographic, or
                      technical data with personal data so that it directly or
                      indirectly identifies an individual, we treat the combined
                      information as personal data.
                    </li>
                  </ul>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    How we collect data about you
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "1rem",
                    }}
                  >
                    We use different methods to collect data from and about you
                    including through:
                  </p>
                  <ul
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "3.5rem",
                    }}
                  >
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      <strong>Direct interactions.</strong> You may give us
                      information about you by filling in forms or by
                      corresponding with us by phone, email or otherwise. This
                      includes information you provide when you create an
                      account, subscribe to our service, search for a product,
                      place an enquiry, participate in other social functions on
                      our Site, enter a competition, promotion or survey, call
                      our customer service number, and when you report a problem
                      with our Site.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      <strong>Automated technologies or interactions.</strong>{" "}
                      As you interact with our Site, we may automatically
                      collect technical data about your equipment, browsing
                      actions and patterns as specified above. We collect this
                      information by using cookies, and other similar
                      technologies.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      <strong>
                        Third parties or publicly available sources.
                      </strong>{" "}
                      We may receive information about you from third parties
                      including, for example, business partners, sub-contractors
                      in technical, payment and delivery services, advertising
                      networks, analytics providers, search information
                      providers, credit reference agencies, data brokers, or
                      aggregators.
                    </li>
                  </ul>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Cookies and Automatic Data Collection Technologies
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "1rem",
                    }}
                  >
                    Our Site uses cookies (small files placed on your device) or
                    other automatic data collection technologies to distinguish
                    you from other Site users. This helps us deliver a better
                    and more personalized service when you browse our Website.
                    It also allows us to improve our Website by enabling us to:
                  </p>
                  <ul style={{ lineHeight: "1.8", color: "#555" }}>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Estimate our audience size and usage patterns.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Store your preferences so we may customize our Site
                      according to your individual interests.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Speed up your searches.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Recognize you when you return to our Site.
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginTop: "1rem",
                    }}
                  >
                    You may refuse to accept browser cookies by activating the
                    appropriate setting on your browser. However, if you select
                    this setting, certain parts of our Site may become
                    inaccessible and certain features may not work correctly.
                    Unless you adjust your browser settings to refuse cookies,
                    our system will issue them. For detailed information on the
                    cookies we use and the purposes for which we use them, see
                    our Cookie Policy.
                  </p>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginTop: "0.5rem",
                      marginBottom: "3.5rem",
                    }}
                  >
                    Our Site pages and emails may contain web beacons (small
                    transparent embedded images or objects, also known as clear
                    gifs, pixel tags, and single-pixel gifs) that permit us, for
                    example, to count website page visitors or email readers, or
                    to compile other similar statistics such as recording
                    website content popularity or verifying system and server
                    integrity.
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Third-Party Use of Cookies
                  </h2>
                  <p style={{ lineHeight: "1.8", color: "#555" }}>
                    Some content or applications, including advertisements, on
                    the Site are served by third parties, including advertisers,
                    ad networks and servers, content providers, and application
                    providers. These third parties may use cookies alone or in
                    conjunction with web beacons or other tracking technologies
                    to collect information about you when you use our Site. They
                    may associate the information collected with your personal
                    data or they may collect information, including personal
                    data, about your online activities over time and across
                    different websites or other online services. They may use
                    this information to provide you with interest-based
                    (behavioural) advertising or other targeted content. We do
                    not control how these third-party tracking technologies
                    operate or how they may use the collected data. If you have
                    any questions about an advertisement or other targeted
                    content, you should contact the responsible provider
                    directly. For information about how you can opt out of
                    receiving targeted advertising from many providers, see Your
                    Personal Data Use Choices.
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    How we use your personal data
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "1rem",
                    }}
                  >
                    We use your personal data to provide you with products,
                    offer you services, communicate with you, deliver
                    advertising and marketing or to conduct other business
                    operations, such as using data to improve and personalize
                    your experiences. Examples of how we may use the personal
                    data we collect include to:
                  </p>
                  <ul style={{ lineHeight: "1.8", color: "#555" }}>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Present our Site and provide you with the information,
                      products, services, and support that you request from us.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Meet our obligations and enforce our rights arising from
                      any contracts with you, including for billing or
                      collections, or comply with legal requirements.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Fulfil the purposes for which you provided the data or
                      that were described when it was collected.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Notify you about changes to our Site, products, or
                      services.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Ensure that we present our Site content in the most
                      effective manner for you and for your computer.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Administer our Site and conduct internal operations,
                      including for troubleshooting, data analysis, testing,
                      research, statistical, and survey purposes.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Improve our Site, products or services, marketing, or
                      customer relationships and experiences.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Protect our Site, employees, or operations.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Measure or understand the effectiveness of the advertising
                      we serve to you and others, and to deliver relevant
                      advertising to you.
                    </li>
                    <li className="mb-2" style={{ listStyleType: "disc" }}>
                      Make suggestions and recommendations to you and other
                      users of our Site about goods or services that may
                      interest you or them.
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginTop: "1rem",
                      marginBottom: "3.5rem",
                    }}
                  >
                    We may also use personal data to contact you about our own
                    and third-parties' goods and services that may be of
                    interest to you. If you do not want us to use your data in
                    this way, please check the relevant box located on the form
                    where we collect your data (the form can be requested from
                    info@questrealestate.ae). For more information, see Your
                    Personal Data Use Choices. We may use personal data to
                    enable us to display advertisements to our advertisers'
                    target audiences. Even though we do not disclose your
                    personal data for these purposes without your consent, if
                    you click on or otherwise interact with an advertisement,
                    the advertiser may assume that you meet its target criteria.
                    We may use non-personal data for any business purpose.
                  </p>
                </div>

                <div className="policy-section mb-4"></div>

                <div className="policy-section mb-4">
                  <h2
                    className="mb-3 fw-light"
                    style={{ color: "#5a4a3a", fontSize: "1.8rem" }}
                  >
                    Disclosure of your personal data
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "1rem",
                    }}
                  >
                    We may share your personal data with:
                  </p>
                  <ul style={{ lineHeight: "1.8", color: "#555" }}>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Any member of our corporate group, which means our
                      subsidiaries, our ultimate holding company and its
                      subsidiaries, and our affiliates.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Business partners, suppliers, service providers,
                      sub-contractors, and other third parties we use to support
                      our business (such as analytics and search engine
                      providers that assist us with website improvement and
                      optimization). We contractually require these third
                      parties to keep that personal data confidential and use it
                      only for the contracted purposes.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Third parties to market their products or services to you
                      if you have consented to/not opted out of these
                      disclosures. For more information, see Your Personal Data
                      Use Choices.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Advertisers and advertising networks that require the data
                      to select and serve relevant ads to you and others. We may
                      also use such aggregate information to help advertisers
                      reach the kind of audience they want to target (for
                      example, women in a specific location). We may make use of
                      the personal data we have collected from you to enable us
                      to comply with our advertisers' wishes by displaying their
                      advertisement to that target audience.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      Credit reference agencies when required to assess your
                      credit score before entering into a contract with you.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      To fulfil the purpose for which you provide it.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      For any other purposes that we disclose when you provide
                      the data.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      With your consent.
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginTop: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    We may also disclose your personal data to third parties:
                  </p>
                  <ul
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "3.5rem",
                    }}
                  >
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      In the event that we sell or buy any business or assets,
                      in which case we may disclose your personal data to the
                      prospective seller or buyer of such business or assets.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      To a buyer or other successor in the event of merger,
                      divestiture, restructuring, reorganization, dissolution,
                      or other sale or transfer of some or all of our assets,
                      whether as a going concern or as part of bankruptcy,
                      liquidation, or similar proceeding, where one of the
                      transferred assets is the personal data we hold.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      To comply with any court order, law, or legal process,
                      including responding to any government or regulatory
                      request.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      To enforce or apply our terms of use Terms and Conditions
                      and other agreements.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      To protect the rights, property, or safety of our
                      business, our employees, our customers, or others. This
                      includes exchanging information with other companies and
                      organizations for the purposes of cybersecurity, fraud
                      protection, and credit risk reduction. We may share
                      non-personal data without restriction.
                    </li>
                  </ul>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Consent to personal data transfer
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "3.5rem",
                    }}
                  >
                    We are based in the United Arab Emirates. We may process,
                    store, and transfer the personal data we collect, in and to
                    a country outside your own, with different privacy laws that
                    may or may not be as comprehensive as your own. By
                    submitting your personal data or engaging with our Site, you
                    consent to this transfer, storing, or processing.
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Your personal data use choices
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "1rem",
                    }}
                  >
                    We are committed to providing you with control over the use
                    of your personal data, especially regarding marketing and
                    advertising. To help manage your preferences, we have
                    implemented the following mechanisms:
                  </p>
                  <ul style={{ lineHeight: "1.8", color: "#555" }}>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      <strong>
                        Promotional Offers from Quest Bloom Real Estate:
                      </strong>{" "}
                      If you prefer not to receive promotional emails about our
                      products, services, or those of third parties, you can
                      opt-out by checking the relevant box when providing your
                      data (i.e., on order or registration forms, adjusting your
                      user preferences within your account profile on our Site,
                      or sending a request via email to
                      info@questrealestate.ae). Please note that this opt-out
                      does not apply to transactional communications, such as
                      those related to product purchases, warranty
                      registrations, or service requests.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      <strong>Third-Party Advertising:</strong> If you do not
                      want us to share your personal data with unaffiliated
                      third parties for promotional purposes, you can opt-out by
                      checking the relevant box when submitting your data. You
                      can also opt-out by sending us an email stating your
                      request to info@questrealestate.ae.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      <strong>Tracking Technologies and Advertising:</strong>{" "}
                      You can configure your browser to refuse or alert you
                      about cookies. However, be aware that disabling cookies
                      may affect the functionality of some parts of our Site.
                      For further details, please refer to our "Cookies and
                      Automatic Data Collection Technologies" section.
                    </li>
                    <li className="mb-3" style={{ listStyleType: "disc" }}>
                      <strong>Targeted Advertising:</strong> If you do not want
                      us to use your data for delivering targeted
                      advertisements, you can opt-out by checking the
                      appropriate box when submitting your data. You can also
                      always send us an email stating your request to
                      info@questrealestate.ae.
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginTop: "1rem",
                      marginBottom: "3.5rem",
                    }}
                  >
                    Additionally, our Site may contain links to external
                    websites or include third-party plug-ins. These third
                    parties have their own privacy policies, and we encourage
                    you to review them before sharing any personal data, as we
                    are not responsible for their practices.
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Accessing and correcting your personal data
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "3.5rem",
                    }}
                  >
                    You can access, review, and change your personal data by
                    sending us an email stating your request to
                    info@questrealestate.ae. You may also send us an email at{" "}
                    <a
                      href="mailto:info@questrealestate.ae"
                      style={{ color: "#5a4a3a" }}
                    >
                      info@questrealestate.ae
                    </a>{" "}
                    to request access to, correct, or delete personal data that
                    you have provided to us. We may not accommodate a request to
                    change or delete information if we believe the change or
                    deletion would violate any law or legal requirement or
                    contractual requirement or negatively impact the
                    information's accuracy.
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Data security
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "3.5rem",
                    }}
                  >
                    The security of your personal data is very important to us.
                    We use physical, electronic, and administrative safeguards
                    designed to protect your personal data from loss, misuse,
                    and unauthorized access, use, alteration, or disclosure. We
                    store all personal data you provide to us behind firewalls
                    on servers employing security protections. The safety and
                    security of your information also depends on you. Where we
                    have given you (or where you have chosen) a password for
                    access to certain parts of our Site, you are responsible for
                    keeping this password confidential. We ask you not to share
                    your password with anyone. Unfortunately, the transmission
                    of information via the internet is not completely secure.
                    Although we do our best to protect your personal data, we
                    cannot guarantee the security of your personal data
                    transmitted to our Site. Any transmission of personal data
                    is at your own risk. We are not responsible for the
                    circumvention of any privacy settings or security measures
                    contained on the Site.
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Children's online privacy
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "3.5rem",
                    }}
                  >
                    We do not direct our Site to minors and we do not knowingly
                    collect personal data from minor as defined by local legal
                    requirements. If we learn we have mistakenly or
                    unintentionally collected or received personal data from a
                    child without appropriate consent, we will delete it. If you
                    believe we mistakenly or unintentionally collected any
                    information from or about a child, please contact us at{" "}
                    <a
                      href="mailto:info@questrealestate.ae"
                      style={{ color: "#5a4a3a" }}
                    >
                      info@questrealestate.ae
                    </a>
                    .
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Changes to the Privacy Policy
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "3.5rem",
                    }}
                  >
                    We will post any changes we may make to the Privacy Policy
                    on this page. Please visit this page frequently to see any
                    updates or changes to the Privacy Policy.
                  </p>
                </div>

                <div
                  className="policy-section"
                  style={{ marginBottom: "3rem" }}
                >
                  <h2
                    className="fw-light"
                    style={{
                      color: "#5a4a3a",
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Contact information
                  </h2>
                  <p style={{ lineHeight: "1.8", color: "#555" }}>
                    Please address questions, comments, and requests regarding
                    this Privacy Policy and our privacy practices to{" "}
                    <a
                      href="mailto:info@questrealestate.ae"
                      style={{ color: "#5a4a3a" }}
                    >
                      info@questrealestate.ae
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Privacy Policy Section */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Contact;
