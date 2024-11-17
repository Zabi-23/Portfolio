

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../.././config";
import "./Contact.css";
import { motion } from "framer-motion";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [phone, setPhone] = useState(""); // State för telefonnummer

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !msg ) { // Kontrollera att alla fält är ifyllda
        toast.error("Vänligen fyll i alla fält");
        return;
      }

      const res = await axios.post(`${API_URL}/sendEmail`, {
        name,
        email,
        phone, // Skicka med telefonnumret
        msg,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Ditt meddelande har skickats framgångsrikt");
        setName("");
        setEmail("");
        setPhone(""); // Töm telefonnummerfältet
        setMsg("");
      } else {
        toast.error(res.data.message || "Fel vid att skicka e-post");
      }
    } catch (error) {
      console.log("Fel vid e-postskick:", error.response?.data || error.message);
      toast.error("Kunde inte skicka meddelande.");
    }
  };

  return (
    <div className="contact" id="contact">
      <div className="card card0 border-0">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12">
            <div className="card1">
              <div className="row border-line">
                <motion.img
                  src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg?w=2000"
                  alt="contact"
                  className="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="card2 d-flex card border-0 px-4 py-5">
              <div className="row">
                <div className="row">
                  <h6>
                    Contact With Me
                    <BsLinkedin color="blue" size={30} className="ms-2" />
                    <BsGithub color="black" size={30} className="ms-2" />
                    <BsFacebook color="blue" size={30} className="ms-2" />
                  </h6>
                  {/* Lägg till telefonnummerlänk */}
                  <p>
                    Phone:{" "}
                    <a href="tel:+46769242525" className="phone-link">
                      +46 769 242 525
                    </a>
                  </p>
                  {/* Lägg till SMS-länk */}
                  
                    <p className="sms-link">
                     SEND SMS:{" "}
                     <a href={`sms:${phone}`} >
                        Send a message to me
                        </a>
                      </p>

                </div>

                <div className="row px-3 mb-4">
                  <div className="line" />
                  <small className="or text-center">OR</small>
                  <div className="line" />
                </div>
                <div className="row px-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Write your name"
                    className="mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="row px-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Write your email"
                    className="mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                
                <div className="row px-3">
                  <textarea
                    name="msg"
                    placeholder="Write your message"
                    className="mb-3"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                </div>
                <div className="row px-3">
                  <button className="button" onClick={handleSubmit}>
                  SEND MESSAGE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
