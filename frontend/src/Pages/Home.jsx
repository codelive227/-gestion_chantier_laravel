import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/ima1.jpg')" }}
    >
      {/* Overlay sombre semi-transparent */}
      <div className="absolute inset-0 bg-[#0F1C2E]/60"></div>

      {/* Contenu centré avec animation */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          Bienvenue sur <span className="text-[#4DA6FF]">AGRTravis</span>
        </h1>
        <p className="mb-6 text-lg text-gray-100 max-w-xl mx-auto">
          Votre partenaire de confiance pour tous vos projets de construction et de rénovation.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/login"
            className="bg-[#0F1C2E] hover:bg-[#4DA6FF] text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-300"
          >
            Commencer
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
