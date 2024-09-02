import HeroImage from '../components/heroImage';
import  Navbar  from '../components/navbar';
import React from 'react';

function EnSavoirPlus() {

  return (
    <div className="container">
      <Navbar/>
      <h1> Ce projet</h1>
      <p> Ce projet est à la base une piscine que j'ai du réaliser en quelques semaines afin d'entrevoir des technologies que je n'avais jamais essayé à savoir NestJs, MongoDb et React lors d'une formation Concepteur Développeur d'Application
        . Je n'ai pas pu poursuivre la formation n'ayant pas trouver d'aletrnance mais j'ai décidé de poursuivre le projet afin de monter en compétences. Le projet n'est pas encore parfait, je rencontre en ce moment des problèmes de persistance de données, de gestion du plugin React Daypilot et bien sur du design. Mais il reflète ce que je suis capable de faire à l'instant T</p>
    </div>
  );
}

export default EnSavoirPlus;
