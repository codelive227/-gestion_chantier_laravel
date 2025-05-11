import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { title: "Terrassement", image: "image/ter1.jpg", link: "#" },
  { title: "Les Fondations", image: "image/fond1.jpg", link: "#" },
  { title: "Dallages & Poteaux", image: "image/poto1.jpg", link: "#" },
  { title: "Mur de Clôture, Escalier & Piscine", image: "image/mur1.jpg", link: "#" },
  { title: "Carrelage & Marbre", image: "image/carr.jpg", link: "#" },
  { title: "Peinture", image: "image/pein1.jpg", link: "#" },
  { title: "Menuiserie Aluminium", image: "image/allu.jpg", link: "#" },
  { title: "Menuiserie Bois", image: "image/bois1.jpg", link: "#" },
  { title: "Sanitaire", image: "image/sani.jpg", link: "#" },
  { title: "Plomberie", image: "image/plob.jpg", link: "#" },
];

const Projects = () => {
  return (
    <section className="py-20 bg-[#F5F7FA]" id="projets">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl font-extrabold text-[#0F1C2E] mb-4">Nos Réalisations</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez une sélection de projets réalisés avec soin, expertise et passion pour le bâtiment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-16">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-[#0F1C2E] mb-3">{project.title}</h3>
              <a
                href={project.link}
                className="inline-block bg-[#0F1C2E] hover:bg-[#4DA6FF] text-white font-semibold px-6 py-2 rounded-full shadow transition duration-300"
              >
                Voir le projet
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
