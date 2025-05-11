import React from 'react';

const Contact = () => {
  return (
    <section className="py-16 bg-[#F5F7FA]" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-[#0F1C2E] mb-8">Contactez-nous</h2>
        
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Formulaire de contact */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <form className="space-y-6 bg-white p-8 rounded-xl shadow-md">
              <div>
                <label className="block text-[#0F1C2E] font-semibold">Nom</label>
                <input
                  type="text"
                  className="w-full border border-[#0F1C2E] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DA6FF] transition duration-200"
                />
              </div>
              <div>
                <label className="block text-[#0F1C2E] font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full border border-[#0F1C2E] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DA6FF] transition duration-200"
                />
              </div>
              <div>
                <label className="block text-[#0F1C2E] font-semibold">Message</label>
                <textarea
                  className="w-full border border-[#0F1C2E] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DA6FF] transition duration-200"
                  rows="5"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0F1C2E] hover:bg-[#4DA6FF] text-white font-semibold py-3 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                Envoyer
              </button>
            </form>
          </div>
          
          {/* Coordonnées et carte */}
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold text-[#0F1C2E] mb-4">Nos coordonnées</h3>
            <p className="mb-2 text-[#0F1C2E]">Adresse : 123 Rue de l'Exemple, Fès, Maroc</p>
            <p className="mb-2 text-[#0F1C2E]">Téléphone : +212 6 00 00 00 00</p>
            <p className="mb-4 text-[#0F1C2E]">Email : contact@agrtravis.ma</p>
            
            {/* Google Map */}
            <div className="w-full h-64 mb-6">
              <iframe
                title="Localisation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.123456789!2d-5.000000!3d34.000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b123456789%3A0xabcdef123456789!2sFès%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1600000000000!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
