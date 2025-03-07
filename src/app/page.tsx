"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

const PhysicsFlashcards = () => {
  const [cards, setCards] = useState([
    // KINEMATIKA
    {
      id: 1,
      category: "KINEMATIKA",
      front: "Rovnoměrný pohyb",
      back: "v = \\frac{\\Delta s}{\\Delta t}",
      known: false,
    },
    {
      id: 2,
      category: "KINEMATIKA",
      front: "Zrychlení",
      back: "a = \\frac{\\Delta v}{\\Delta t}",
      known: false,
    },
    {
      id: 3,
      category: "KINEMATIKA",
      front: "Volný pád (rychlost)",
      back: "v = g \\cdot t",
      known: false,
    },
    {
      id: 4,
      category: "KINEMATIKA",
      front: "Volný pád (dráha)",
      back: "s = \\frac{1}{2}gt^2",
      known: false,
    },
    {
      id: 5,
      category: "KINEMATIKA",
      front: "Frekvence",
      back: "f = \\frac{1}{T}",
      known: false,
    },
    {
      id: 6,
      category: "KINEMATIKA",
      front: "Úhlová rychlost",
      back: "\\omega = \\frac{\\Delta \\varphi}{\\Delta t}",
      known: false,
    },
    {
      id: 7,
      category: "KINEMATIKA",
      front: "Úhlová rychlost (vztah k frekvenci)",
      back: "\\omega = 2 \\pi f",
      known: false,
    },
    {
      id: 8,
      category: "KINEMATIKA",
      front: "Dostředivé zrychlení",
      back: "a_p = \\frac{v^2}{r}",
      known: false,
    },

    // DYNAMIKA
    {
      id: 9,
      category: "DYNAMIKA",
      front: "Zákon síly",
      back: "F = m \\cdot a",
      known: false,
    },
    {
      id: 10,
      category: "DYNAMIKA",
      front: "Dostředivá síla",
      back: "F_p = \\frac{mv^2}{r}",
      known: false,
    },
    {
      id: 11,
      category: "DYNAMIKA",
      front: "Tíha tělesa",
      back: "G = m \\cdot g",
      known: false,
    },

    // ENERGIE HMOTNÝCH BODŮ
    {
      id: 12,
      category: "ENERGIE",
      front: "Mechanická práce",
      back: "W = F \\cdot s \\cdot \\cos(\\varphi)",
      known: false,
    },
    {
      id: 13,
      category: "ENERGIE",
      front: "Výkon",
      back: "P = \\frac{W}{t}",
      known: false,
    },
    {
      id: 14,
      category: "ENERGIE",
      front: "Kinetická energie",
      back: "E_k = \\frac{mv^2}{2}",
      known: false,
    },
    {
      id: 15,
      category: "ENERGIE",
      front: "Potenciální energie",
      back: "E_p = mgh",
      known: false,
    },

    // GRAVITAČNÍ POLE
    {
      id: 16,
      category: "GRAVITAČNÍ POLE",
      front: "Gravitační síla",
      back: "F_g = K \\cdot \\frac{m_1 \\cdot m_2}{r^2}",
      known: false,
    },

    // MECHANIKA TUHÉHO TĚLESA
    {
      id: 17,
      category: "MECHANIKA TUHÉHO TĚLESA",
      front: "Moment síly",
      back: "M = F \\cdot d",
      known: false,
    },

    // MECHANIKA KAPALIN A PLYNŮ
    {
      id: 18,
      category: "MECHANIKA KAPALIN A PLYNŮ",
      front: "Tlak",
      back: "p = \\frac{F}{S}",
      known: false,
    },
    {
      id: 19,
      category: "MECHANIKA KAPALIN A PLYNŮ",
      front: "Hydrostatický tlak",
      back: "p = h \\cdot \\rho \\cdot g",
      known: false,
    },

    // MOLEKULOVÁ FYZIKA
    {
      id: 20,
      category: "MOLEKULOVÁ FYZIKA",
      front: "Termodynamická teplota",
      back: "T = t + 273,15",
      known: false,
    },
    {
      id: 21,
      category: "MOLEKULOVÁ FYZIKA",
      front: "Teplo",
      back: "Q = m \\cdot c \\cdot \\Delta t",
      known: false,
    },
    {
      id: 22,
      category: "MOLEKULOVÁ FYZIKA",
      front: "Relativní atomová hmotnost",
      back: "A_r = \\frac{m_e}{m_u}",
      known: false,
    },
    {
      id: 23,
      category: "MOLEKULOVÁ FYZIKA",
      front: "Látkové množství",
      back: "n = \\frac{N}{N_a}",
      known: false,
    },
    {
      id: 24,
      category: "MOLEKULOVÁ FYZIKA",
      front: "Molární hmotnost",
      back: "M_m = \\frac{m}{n}",
      known: false,
    },

    // ELEKTRICKÝ PROUD
    {
      id: 25,
      category: "ELEKTRICKÝ PROUD",
      front: "Elektrický proud",
      back: "I = \\frac{\\Delta Q}{\\Delta t}",
      known: false,
    },
    {
      id: 26,
      category: "ELEKTRICKÝ PROUD",
      front: "Ohmův zákon",
      back: "R = \\frac{U}{I}",
      known: false,
    },
    {
      id: 27,
      category: "ELEKTRICKÝ PROUD",
      front: "Výkon elektrického proudu",
      back: "P = U \\cdot I",
      known: false,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [filteredCards, setFilteredCards] = useState([...cards]);
  const [reviewMode, setReviewMode] = useState(false);

  const categories = [
    "ALL",
    "KINEMATIKA",
    "DYNAMIKA",
    "ENERGIE",
    "GRAVITAČNÍ POLE",
    "MECHANIKA TUHÉHO TĚLESA",
    "MECHANIKA KAPALIN A PLYNŮ",
    "MOLEKULOVÁ FYZIKA",
    "ELEKTRICKÝ PROUD",
  ];

  useEffect(() => {
    if (activeCategory === "ALL") {
      setFilteredCards([...cards]);
    } else {
      setFilteredCards(
        cards.filter((card) => card.category === activeCategory)
      );
    }
    setCurrentIndex(0);
    setFlipped(false);
  }, [activeCategory, cards]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const markAsKnown = () => {
    const updatedCards = [...cards];
    updatedCards[
      cards.findIndex((card) => card.id === filteredCards[currentIndex].id)
    ].known = true;
    setCards(updatedCards);
    nextCard();
  };

  const markAsUnknown = () => {
    const updatedCards = [...cards];
    updatedCards[
      cards.findIndex((card) => card.id === filteredCards[currentIndex].id)
    ].known = false;
    setCards(updatedCards);
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setFlipped(false);
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
    setFlipped(false);
  };

  const resetKnownStatus = () => {
    const updatedCards = cards.map((card) => ({ ...card, known: false }));
    setCards(updatedCards);
  };

  const toggleReviewMode = () => {
    setReviewMode(!reviewMode);
    setActiveCategory("ALL");
    setCurrentIndex(0);
    setFlipped(false);
  };

  const reviewCards = reviewMode
    ? cards.filter((card) => !card.known)
    : filteredCards;

  const currentCard = reviewCards[currentIndex] || {
    front: "Všechny karty zvládnuty!",
    back: "Gratulujeme! 🎉",
    known: false,
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Fyzikální vzorce - Flashkarty
      </h1>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setReviewMode(false);
            }}
            className={`px-3 py-1 text-sm rounded ${
              activeCategory === category && !reviewMode
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* <div className="mb-4 flex justify-between w-full max-w-md">
        <button
          onClick={toggleReviewMode}
          className={`px-4 py-2 rounded ${
            reviewMode ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {reviewMode ? "Procvičuji neznámé" : "Procvičovat neznámé"}
        </button>

        <button
          onClick={resetKnownStatus}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded flex items-center gap-1"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="stats mb-4 flex gap-4 text-sm">
        <div>
          Celkem: <span className="font-bold">{cards.length}</span>
        </div>
        <div>
          Znám:{" "}
          <span className="font-bold text-green-600">
            {cards.filter((c) => c.known).length}
          </span>
        </div>
        <div>
          Neznám:{" "}
          <span className="font-bold text-red-600">
            {cards.filter((c) => !c.known).length}
          </span>
        </div>
      </div> */}

      {/* Card Display */}
      {reviewMode && reviewCards.length === 0 ? (
        <div className="h-64 w-full max-w-md bg-white rounded-lg shadow-lg flex items-center justify-center p-8 text-center text-lg font-medium text-gray-700">
          Všechny karty jsou označeny jako známé! 🎉
        </div>
      ) : (
        <>
          <div
            className={`h-64 w-full max-w-md bg-white rounded-lg shadow-lg flex items-center justify-center p-8 cursor-pointer transition-transform duration-300 ${
              flipped ? "bg-blue-50" : ""
            }`}
            onClick={handleFlip}
          >
            <div className="text-center">
              {reviewMode && (
                <div className="text-xs text-gray-500 mb-2">
                  {currentCard.category}
                </div>
              )}
              <div className="text-xl font-medium">
                {flipped ? (
                  <InlineMath math={currentCard.back} />
                ) : (
                  currentCard.front
                )}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {flipped
                  ? "Klikněte pro zobrazení otázky"
                  : "Klikněte pro zobrazení odpovědi"}
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full max-w-md mt-6">
            <button
              onClick={prevCard}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded flex items-center"
            >
              <ChevronLeft size={20} /> Předchozí
            </button>

            <div className="text-center pt-2">
              {currentIndex + 1} / {reviewCards.length}
            </div>

            <button
              onClick={nextCard}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded flex items-center"
            >
              Další <ChevronRight size={20} />
            </button>
          </div>

          {/* <div className="flex gap-4 mt-6">
            <button
              onClick={markAsUnknown}
              className="px-6 py-2 bg-red-500 text-white rounded flex items-center gap-2"
            >
              <X size={20} /> Neznám
            </button>

            <button
              onClick={markAsKnown}
              className="px-6 py-2 bg-green-500 text-white rounded flex items-center gap-2"
            >
              <Check size={20} /> Znám
            </button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default PhysicsFlashcards;
