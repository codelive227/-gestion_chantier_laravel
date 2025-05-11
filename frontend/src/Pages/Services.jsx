import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Terrains",
    description: "Préparation du sol pour la construction, nivellement du terrain, excavation et déblaiement des terres.",
    image: "image/tar.jpg", link: "/services/terrains"
  },
  {
    title: "Fondations",
    description: "Installation des fondations en béton armé, pieux, ou semelles filantes.",
    image: "image/fond.jpg", link: "#"
  },
  {
    title: "Dallages et Poteaux",
    description: "Dalles bétonnées et structures verticales pour stabilité et durabilité.",
    image: "image/poto.jpg", link: "/services/dallages"
  },
  {
    title: "Mur de Clôture, Escalier & Piscine",
    description: "Structures solides et esthétiques pour vos extérieurs.",
    image: "image/esca.jpg", link: "#"
  },
  {
    title: "Carrelage & Marbre",
    description: "Finitions de qualité pour les sols et murs intérieurs.",
    image: "image/car1.jpg", link: "#"
  },
  {
    title: "Plâtre",
    description: "Cloisons, faux plafonds et finitions soignées en plâtre.",
    image: "image/paltr.jpg", link: "#"
  },
  {
    title: "Peinture",
    description: "Habillage esthétique et protecteur pour tous types de surfaces.",
    image: "image/pein.jpg", link: "#"
  },
  {
    title: "Menuiserie Bois",
    description: "Fabrication de menuiseries sur mesure en bois.",
    image: "image/bois.jpg", link: "#"
  },
  {
    title: "Menuiserie Aluminium",
    description: "Design moderne, isolation et durabilité avec l’aluminium.",
    image: "image/almu.jpg", link: "#"
  },
  {
    title: "Plomberie",
    description: "Installation et réparation de systèmes d’eau et évacuation.",
    image: "image/plob.jpg", link: "#"
  },
  {
    title: "Sanitaire",
    description: "Salles de bains, cuisines et équipements sanitaires complets.",
    image: "image/sant.jpg", link: "#"
  },
  {
    title: "Entretien & Réparation",
    description: "Travaux de maintenance pour bâtiments résidentiels ou pro.",
    image: "image/entr.jpg", link: "#"
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-[#F5F7FA]" id="services">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-[#0F1C2E] uppercase tracking-wide">Nos Services</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mt-4">
          Des solutions globales pour vos projets de construction, rénovation et aménagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 lg:px-12">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-[#0F1C2E] mb-3">{service.title}</h3>
              <p className="text-gray-700 mb-5 text-sm leading-relaxed">{service.description}</p>
              <a
                href={service.link}
                className="inline-block px-6 py-2 text-sm font-semibold bg-[#0F1C2E] text-white rounded-full hover:bg-[#4DA6FF] transition-colors duration-300"
              >
                Savoir plus
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
