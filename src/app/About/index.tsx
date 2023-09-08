import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./style.scss";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const About = () => {
  const [expandedAbout, setExpandedAbout] = React.useState<string | false>(
    "panel1"
  );
  const [expandedFaq, setExpandedFaq] = React.useState<string | false>(
    "panel1"
  );

  const handleChangeAbout =
    (panel: string) =>
    (event: React.SyntheticEvent, newExpandedAbout: boolean) => {
      setExpandedAbout(newExpandedAbout ? panel : false);
    };

  const handleChangeFaq =
    (panel: string) =>
    (event: React.SyntheticEvent, newExpandedFaq: boolean) => {
      setExpandedFaq(newExpandedFaq ? panel : false);
    };

  return (
    <div className="about-page-container">
      {/* About */}

      <Typography className="about-title">
        <InfoIcon fontSize="large" />
        About Our Company
      </Typography>
      <Accordion
        expanded={expandedAbout === "panel1"}
        onChange={handleChangeAbout("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Company History and Origins</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Swift Shop is a leading electronic sales platform that has been
            serving customers since its inception in 2010. Our journey began in
            the vibrant city of Baku, Azerbaijan, and over the years, we've
            grown into a trusted name in the world of e-commerce.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedAbout === "panel2"}
        onChange={handleChangeAbout("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Our Mission and Vision</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our mission at Swift Shop is simple yet profound – to provide our
            customers with exceptional shopping experiences. Our vision extends
            beyond today; we aim to shape the future of shopping using
            innovative technology and a customer-centric approach.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedAbout === "panel3"}
        onChange={handleChangeAbout("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Our Dedicated Team</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            At Swift Shop, our team comprises passionate and experienced
            professionals who are committed to excellence. Each member brings
            their expertise to the table, ensuring that every aspect of our
            service meets the highest standards.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedAbout === "panel4"}
        onChange={handleChangeAbout("panel4")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Social Responsibility</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We understand our responsibility towards the community and the
            environment. Swift Shop actively participates in sustainability
            initiatives and social outreach programs, contributing positively to
            our society.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedAbout === "panel5"}
        onChange={handleChangeAbout("panel5")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Innovation and Technology</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Staying at the forefront of technology trends is a core principle at
            Swift Shop. We continually update and enhance our platform to ensure
            our customers enjoy the latest features and innovations in the world
            of online shopping.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedAbout === "panel6"}
        onChange={handleChangeAbout("panel6")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Customer-Centric Approach</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            At Swift Shop, our customers are at the heart of everything we do.
            We strive to understand and meet their needs, using their valuable
            feedback to drive improvements in our products and services.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ */}

      <Typography className="about-title">
        <ContactSupportIcon fontSize="large" />
        FAQ<span>(Frequently Asked Questions)</span>
      </Typography>

      <Accordion
        expanded={expandedFaq === "panel1"}
        onChange={handleChangeFaq("panel1")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>
            Q: What is Swift Shop and what types of products does it offer?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Swift Shop is an electronic sales platform. We offer a wide range
            of products, including phones, tablets, computers, electronic
            accessories, and more.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedFaq === "panel2"}
        onChange={handleChangeFaq("panel2")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Q: How can I sign up?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Signing up is easy! You can register by clicking the{" "}
            <Link  to={ROUTES.USER.REGISTER}>Register </Link>  {" "}
            button in the top right corner of our homepage or by downloading our
            app.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedFaq === "panel3"}
        onChange={handleChangeFaq("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Q: When will my order be delivered?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: The delivery time depends on your location and the item you've
            ordered. Typically, we deliver orders within 3-5 business days after
            confirmation.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedFaq === "panel4"}
        onChange={handleChangeFaq("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Q: What is your return and refund policy?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: You can return and refund within 14 working days.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedFaq === "panel5"}
        onChange={handleChangeFaq("panel5")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Q: How can I reach customer support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: You can contact our customer support team through our {" "} <Link to={ROUTES.CONTACT_US}> Contact Us</Link> {" "}
            page. We're ready to assist
            you with any questions!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedFaq === "panel6"}
        onChange={handleChangeFaq("panel6")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Q: How do you ensure security?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Your security is our priority. All payment transactions are
            conducted in a secure, encrypted environment, and your personal
            information is kept confidential.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
