import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
  Users,
  Package,
  Boxes,
  HardHat,
  Building2,
  Truck
} from 'lucide-react';

const DashboardHome = () => {
  const [statistics, setStatistics] = useState({});
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios.get('/api/dashboard/statistics')
      .then((response) => {
        setStatistics(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des statistiques :', error);
      });
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const statCards = [
    {
      title: 'Fournisseurs',
      value: statistics.fournisseurs,
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-100'
    },
    {
      title: 'Clients',
      value: statistics.clients,
      icon: <Users className="w-6 h-6 text-green-600" />,
      color: 'bg-green-100'
    },
    {
      title: 'Matières Premières',
      value: statistics.matieresPremieres,
      icon: <Boxes className="w-6 h-6 text-yellow-600" />,
      color: 'bg-yellow-100'
    },
    {
      title: 'Articles',
      value: statistics.articles,
      icon: <Package className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-100'
    },
    {
      title: 'Ouvriers',
      value: statistics.ouvriers,
      icon: <HardHat className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-100'
    },
    {
      title: 'Chantiers',
      value: statistics.chantiers,
      icon: <Building2 className="w-6 h-6 text-red-600" />,
      color: 'bg-red-100'
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">📊 Tableau de Bord</h2>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl transition-all rounded-xl p-5 flex items-center gap-4"
          >
            <div className={`p-3 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h3 className="text-xl font-semibold text-gray-900">{stat.value ?? 0}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Calendrier */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📅 Planification des Chantiers</h3>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="rounded-xl p-2 shadow-inner"
        />
        <p className="mt-4 text-gray-600">Date sélectionnée : <strong>{date.toLocaleDateString()}</strong></p>
      </div>
    </div>
  );
};

export default DashboardHome;
