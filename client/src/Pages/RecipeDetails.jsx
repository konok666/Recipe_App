import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import "../Style/RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Comments & Ratings
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const recipes = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        category: "Italian",
        image: "Spaghetti_Carbonara.png",
        description: "A creamy Italian pasta made with eggs, cheese, pancetta, and pepper.",
        ingredients: [
          "400g spaghetti",
          "200g pancetta or guanciale",
          "4 large eggs",
          "100g Pecorino Romano cheese",
          "Black pepper",
          "Salt"
        ],
        instructions: [
          "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
          "Cut pancetta into small cubes and cook until crispy.",
          "Whisk eggs with grated cheese and black pepper.",
          "Drain pasta and reserve 1 cup of pasta water.",
          "Combine hot pasta and pancetta, remove from heat.",
          "Add egg mixture and mix quickly until creamy.",
          "Serve immediately with extra cheese and pepper."
        ],
        prepTime: "15 minutes",
        cookTime: "20 minutes",
        servings: "4 people"
      },
      {
        id: 2,
        title: "Vegetable Fried Rice",
        category: "Veg Food",
        image: "veg_fried_rice.png",
        description: "A quick and delicious rice dish tossed with veggies and soy sauce.",
        ingredients: [
          "2 cups cooked rice (preferably cooled)",
          "2 tbsp oil",
          "1 onion (finely chopped)",
          "1 carrot (finely chopped)",
          "1/2 cup capsicum (bell pepper, chopped)",
          "1/2 cup cabbage (shredded)",
          "1/4 cup beans (chopped)",
          "2-3 tbsp soy sauce",
          "1 tbsp vinegar",
          "1 tsp black pepper powder",
          "Salt to taste",
          "2 green onions (for garnish)"
        ],
        instructions: [
          "Heat oil in a wok or pan on high flame.",
          "Add onions and sauté until translucent.",
          "Add all chopped vegetables and stir-fry for 2-3 minutes.",
          "Add cooked rice, soy sauce, vinegar, pepper, and salt.",
          "Toss everything on high flame for 2-3 minutes until evenly mixed.",
          "Garnish with chopped green onions and serve hot."
        ],
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        servings: "2-3 people"
      },
      {
        id: 3,
        title: "Chocolate Brownies",
        category: "Dessert",
        image: "brownies.png",
        description: "Rich, fudgy brownies made with dark chocolate and a hint of coffee.",
        ingredients: ["200g dark chocolate", "150g butter", "200g sugar", "3 large eggs", "100g flour", "1 tsp vanilla extract"],
        instructions: [
          "Preheat oven to 180°C.",
          "Melt chocolate and butter together.",
          "Whisk eggs and sugar until fluffy.",
          "Mix chocolate with eggs.",
          "Fold in flour and vanilla.",
          "Pour into tray and bake for 25 mins.",
          "Cool, cut, and serve."
        ],
        prepTime: "15 minutes",
        cookTime: "25 minutes",
        servings: "8 servings"
      },
      {
        id: 4,
        title: "Greek Salad",
        category: "Salad",
        image: "greek_pasta_salad.png",
        description: "A refreshing Mediterranean salad made with crisp vegetables, feta cheese, and olives, tossed in a simple olive oil dressing.",
        ingredients: [
          "2 cups chopped cucumber",
          "2 cups cherry tomatoes (halved)",
          "1 red onion (thinly sliced)",
          "1 green bell pepper (sliced)",
          "1/2 cup Kalamata olives",
          "100g feta cheese (cubed or crumbled)",
          "3 tbsp olive oil",
          "1 tbsp red wine vinegar or lemon juice",
          "1 tsp dried oregano",
          "Salt and black pepper to taste"
        ],
        instructions: [
          "In a large bowl, combine cucumber, tomatoes, onion, and bell pepper.",
          "Add olives and feta cheese on top.",
          "In a small bowl, whisk olive oil, vinegar, oregano, salt, and pepper.",
          "Pour dressing over salad and toss gently.",
          "Serve immediately or chill for 10-15 minutes before serving."
        ],
        prepTime: "15 mins",
        cookTime: "0 mins",
        servings: "2-3 people"
      },
      {
        id: 5,
        title: "Margherita Pizza",
        category: "Italian",
        image: "Margherita_pizza.png",
        description: "A classic Italian pizza topped with tomato sauce, fresh mozzarella, basil leaves, and a drizzle of olive oil for a simple yet flavorful taste.",
        ingredients: [
          "1 pizza dough (store-bought or homemade)",
          "1/2 cup tomato sauce or pizza sauce",
          "150g fresh mozzarella cheese (sliced)",
          "Fresh basil leaves",
          "1 tbsp olive oil",
          "Salt to taste",
          "1/2 tsp dried oregano (optional)"
        ],
        instructions: [
          "Preheat oven to 220°C (425°F).",
          "Roll out the pizza dough onto a baking tray or pizza stone.",
          "Spread tomato sauce evenly over the base.",
          "Place mozzarella slices and fresh basil leaves on top.",
          "Drizzle olive oil and sprinkle a pinch of salt and oregano.",
          "Bake for 10-12 minutes until the crust is golden and cheese is melted.",
          "Slice and serve hot."
        ],
        prepTime: "15 mins",
        cookTime: "12 mins",
        servings: "2-3 people"
      },
      {
        id: 6,
        title: "Butter Chicken",
        category: "North Indian",
        image: "butter_chicken.png",
        description: "A rich and creamy North Indian curry made with marinated chicken cooked in a buttery tomato-based sauce with aromatic spices.",
        ingredients: [
          "500g boneless chicken (cut into pieces)",
          "1 cup yogurt (curd)",
          "1 tbsp lemon juice",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tsp garam masala",
          "2 tbsp butter",
          "1 tbsp oil",
          "1 large onion (finely chopped)",
          "2 tomatoes (pureed)",
          "1 tbsp ginger-garlic paste",
          "1/2 cup fresh cream",
          "1 tsp kasuri methi (dried fenugreek leaves)",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        instructions: [
          "Marinate chicken with yogurt, lemon juice, turmeric, chili powder, garam masala, and salt for at least 1 hour.",
          "Heat oil and butter in a pan, cook marinated chicken until lightly browned; remove and set aside.",
          "In the same pan, sauté onions until golden brown.",
          "Add ginger-garlic paste and tomato puree; cook until oil separates.",
          "Add chili powder, garam masala, and salt; mix well.",
          "Add cooked chicken pieces and simmer for 5-7 minutes.",
          "Pour in fresh cream and sprinkle kasuri methi; cook for 2-3 minutes.",
          "Garnish with coriander and serve hot with naan or rice."
        ],
        prepTime: "1 hour 15 mins",
        cookTime: "30 mins",
        servings: "3-4 people"
      },
      {
        id: 7,
        title: "Masala Dosa",
        category: "South Indian",
        image: "masala_dosa.png",
        description: "A crispy South Indian crepe made from fermented rice and lentil batter, filled with spiced potato masala.",
        ingredients: [
          "2 cups rice",
          "1/2 cup urad dal",
          "2 tbsp chana dal",
          "1/4 tsp fenugreek seeds",
          "Salt, water, oil as needed",
          "4 boiled potatoes",
          "1 onion, 2 green chilies, curry leaves",
          "1 tsp mustard seeds, 1/4 tsp turmeric",
          "2 tbsp oil, coriander, lemon juice"
        ],
        instructions: [
          "Soak and grind rice, dals, and methi into smooth batter; ferment overnight.",
          "Add salt and mix well.",
          "For filling: heat oil, add mustard, dals, chilies, onions, turmeric, potatoes.",
          "Cook 3-4 mins, add coriander and lemon juice.",
          "Spread batter on hot tawa, drizzle oil, cook until crisp.",
          "Place potato masala in center, fold, and serve hot."
        ],
        prepTime: "12 hrs",
        cookTime: "30 mins",
        servings: "8-10 dosas"
      },
      {
        id: 8,
        title: "Caesar Salad",
        category: "Salad",
        image: "Caesar_Salad.png",
        description: "A classic salad made with crisp romaine lettuce, crunchy croutons, Parmesan cheese, and a creamy Caesar dressing.",
        ingredients: [
          "4 cups romaine lettuce (chopped)",
          "1/2 cup croutons",
          "1/4 cup grated Parmesan cheese",
          "1/4 cup Caesar dressing",
          "1 tsp lemon juice (optional)",
          "Salt and black pepper to taste"
        ],
        instructions: [
          "In a large bowl, combine chopped romaine lettuce and croutons.",
          "Add Caesar dressing and toss well to coat evenly.",
          "Sprinkle grated Parmesan cheese on top.",
          "Add a squeeze of lemon juice and season with salt and pepper if desired.",
          "Serve immediately."
        ],
        prepTime: "10 mins",
        cookTime: "0 mins",
        servings: "2-3 people"
      },
      {
        id: 9,
        title: "Pad Thai",
        category: "Asian",
        image: "Pad_Thai.png",
        description: "A popular Thai stir-fried noodle dish made with rice noodles, vegetables, eggs, tofu or shrimp, and a tangy-sweet Pad Thai sauce.",
        ingredients: [
          "200g rice noodles",
          "2 tbsp vegetable oil",
          "2 cloves garlic (minced)",
          "1/2 cup tofu (cubed) or shrimp",
          "1 egg",
          "1 cup bean sprouts",
          "2 green onions (chopped)",
          "2 tbsp tamarind paste",
          "2 tbsp fish sauce",
          "1 tbsp soy sauce",
          "1 tbsp sugar",
          "1/4 cup roasted peanuts (chopped)",
          "Lime wedges for serving",
          "Cilantro for garnish"
        ],
        instructions: [
          "Cook rice noodles according to package instructions; drain and set aside.",
          "Heat oil in a wok or large pan over medium-high heat. Sauté garlic until fragrant.",
          "Add tofu or shrimp and cook until lightly browned or cooked through.",
          "Push ingredients to one side, crack in the egg, scramble, and mix with tofu/shrimp.",
          "Add cooked noodles, tamarind paste, fish sauce, soy sauce, and sugar; toss well.",
          "Stir in bean sprouts and green onions; cook for 1-2 minutes.",
          "Serve hot, garnished with chopped peanuts, lime wedges, and cilantro."
        ],
        prepTime: "15 mins",
        cookTime: "15 mins",
        servings: "2-3 people"
      },
      {
        id: 10,
        title: "Tiramisu",
        category: "Dessert",
        image: "Tiramisu.png",
        description: "A classic Italian no-bake dessert made with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.",
        ingredients: [
          "200g ladyfingers (savoiardi)",
          "250g mascarpone cheese",
          "3 large eggs (separated)",
          "100g sugar",
          "1 cup strong brewed coffee (cooled)",
          "2 tbsp coffee liqueur (optional)",
          "Cocoa powder for dusting"
        ],
        instructions: [
          "Separate egg yolks and whites.",
          "Whisk egg yolks with sugar until pale and creamy; fold in mascarpone cheese.",
          "Beat egg whites until stiff peaks form and gently fold into mascarpone mixture.",
          "Mix coffee with coffee liqueur in a shallow dish.",
          "Dip ladyfingers briefly in coffee mixture and layer them in a serving dish.",
          "Spread half of the mascarpone mixture over the ladyfingers.",
          "Repeat with another layer of soaked ladyfingers and remaining mascarpone.",
          "Cover and refrigerate for at least 4 hours or overnight.",
          "Dust with cocoa powder before serving."
        ],
        prepTime: "20 mins",
        cookTime: "0 mins (plus chilling 4 hours)",
        servings: "4-6 people"
      },
      {
        id: 11,
        title: "Pav Bhaji",
        category: "Street Food",
        image: "Pav_Bhaji.png",
        description: "A popular Indian street food dish consisting of spicy mashed vegetables served with buttered bread rolls (pav).",
        ingredients: [
          "4 medium potatoes (boiled and mashed)",
          "1 cup cauliflower (chopped)",
          "1/2 cup green peas",
          "1 cup carrots (chopped)",
          "1 onion (finely chopped)",
          "1 green bell pepper (chopped)",
          "2 tomatoes (pureed)",
          "2 tbsp butter",
          "2 tbsp oil",
          "1 tbsp ginger-garlic paste",
          "2 tsp Pav Bhaji masala",
          "1 tsp red chili powder",
          "1/2 tsp turmeric powder",
          "Salt to taste",
          "1/2 cup water",
          "Fresh coriander for garnish",
          "4-6 pav buns",
          "Extra butter for toasting pav"
        ],
        instructions: [
          "Heat oil and 1 tbsp butter in a pan; sauté onions until translucent.",
          "Add ginger-garlic paste and sauté for a minute.",
          "Add chopped vegetables and cook for 5-6 minutes.",
          "Add tomato puree, turmeric, chili powder, pav bhaji masala, and salt; cook until vegetables are soft.",
          "Mash the mixture slightly with a masher and add water to adjust consistency.",
          "Add remaining butter and simmer for 5-7 minutes.",
          "Garnish with chopped coriander.",
          "Slice pav buns, toast with butter on a pan until golden.",
          "Serve hot with the bhaji and a lemon wedge on the side."
        ],
        prepTime: "20 mins",
        cookTime: "30 mins",
        servings: "3-4 people"
      },
      {
        id: 12,
        title: "Rasgulla & Sandesh",
        category: "Dessert",
        image: "Rasgulla_Sandesh.png",
        description: "Iconic Bengali sweets made from chhena (fresh cottage cheese). Rasgulla is soft, spongy, and soaked in sugar syrup, while Sandesh is lightly sweetened and flavored with cardamom or saffron.",
        ingredients: [
          "1 liter full-fat milk",
          "2-3 tbsp lemon juice or vinegar",
          "1 cup sugar",
          "4 cups water",
          "1/4 tsp cardamom powder",
          "Few saffron strands (optional)"
        ],
        instructions: [
          "Boil milk in a pan, then add lemon juice/vinegar to curdle and separate chhena (cottage cheese).",
          "Strain the chhena using a muslin cloth and rinse with cold water to remove sourness.",
          "Knead the chhena for 5-10 minutes until smooth.",
          "For Rasgulla: Divide chhena into small balls.",
          "Boil sugar and water in a pan to make sugar syrup; add chhena balls and cook for 10-12 minutes until spongy.",
          "For Sandesh: Take a portion of chhena, mix with sugar and cardamom, shape into flat discs or decorative forms.",
          "Optionally, garnish with saffron strands.",
          "Serve chilled."
        ],
        prepTime: "30 mins",
        cookTime: "20 mins",
        servings: "4-6 people"
      },
      {
        id: 13,
        title: "Macher Jhol",
        category: "East Indian",
        image: "Fish.png",
        description: "A traditional Bengali fish curry made with freshwater fish, mustard, and a blend of aromatic spices, served with steamed rice.",
        ingredients: [
          "500g freshwater fish (like rohu or catla), cleaned and cut",
          "2 tbsp mustard oil (or vegetable oil)",
          "1 tsp mustard seeds",
          "1 medium onion, finely chopped",
          "2 tomatoes, chopped",
          "2-3 green chilies, slit",
          "1 tsp ginger paste",
          "1/2 tsp turmeric powder",
          "1/2 tsp red chili powder",
          "1 tsp cumin powder",
          "Salt to taste",
          "Fresh coriander leaves for garnish",
          "2 cups water"
        ],
        instructions: [
          "Heat mustard oil in a pan until smoking point, reduce flame and add mustard seeds.",
          "Add chopped onions and sauté until golden brown.",
          "Add ginger paste, green chilies, turmeric, red chili powder, and cumin powder; sauté for 1-2 minutes.",
          "Add chopped tomatoes and cook until soft.",
          "Pour in water and bring to a boil.",
          "Gently add fish pieces, cover, and simmer for 10-12 minutes until fish is cooked.",
          "Adjust salt and garnish with fresh coriander leaves.",
          "Serve hot with steamed rice."
        ],
        prepTime: "15 mins",
        cookTime: "25 mins",
        servings: "34 people"
      },
      {
        id: 14,
        title: "Dhokla",
        category: "Snack",
        image: "Dhokla.png",
        description: "A soft and fluffy steamed cake made from fermented gram flour, originating from Gujarat, served with green chutney or fried chilies.",
        ingredients: [
          "1 cup gram flour (besan)",
          "1/2 cup yogurt (curd)",
          "1/2 tsp turmeric powder",
          "1 tsp ginger-green chili paste",
          "1 tsp Eno fruit salt or baking soda",
          "Salt to taste",
          "2 tbsp water (as needed)",
          "1 tbsp oil",
          "1 tsp mustard seeds",
          "A pinch of asafoetida (hing)",
          "2-3 green chilies (slit)",
          "Fresh coriander leaves for garnish"
        ],
        instructions: [
          "In a bowl, mix gram flour, yogurt, turmeric, ginger-green chili paste, salt, and water to form a smooth batter.",
          "Add Eno fruit salt or baking soda just before steaming and mix gently.",
          "Grease a steaming tray and pour the batter evenly.",
          "Steam for 15-20 minutes until a toothpick inserted comes out clean.",
          "Heat oil in a small pan, add mustard seeds, asafoetida, and slit green chilies; pour this tempering over the steamed dhokla.",
          "Garnish with chopped coriander leaves, cut into squares, and serve with green chutney."
        ],
        prepTime: "15 mins",
        cookTime: "20 mins",
        servings: "3-4 people"
      },
      {
        id: 15,
        title: "Momos",
        category: "Street Food",
        image: "Momos.png",
        description: "A popular street food from India and Tibet consisting of steamed or fried dumplings filled with vegetables or meat, served with a spicy chutney.",
        ingredients: [
          "2 cups all-purpose flour",
          "1/2 tsp salt",
          "Water as needed",
          "1 cup cabbage (finely chopped)",
          "1/2 cup carrot (grated)",
          "1/2 cup capsicum or bell pepper (finely chopped)",
          "1 small onion (finely chopped)",
          "2 cloves garlic (minced)",
          "1 tsp ginger (minced)",
          "1 tsp soy sauce",
          "Salt and pepper to taste",
          "1 tsp oil (for filling)"
        ],
        instructions: [
          "Mix flour and salt in a bowl, add water gradually and knead into a smooth dough; let it rest for 30 minutes.",
          "Heat oil in a pan, sauté garlic, ginger, onions, and other vegetables until slightly soft.",
          "Add soy sauce, salt, and pepper; cook for 2-3 minutes and cool the filling.",
          "Roll small portions of dough into thin circles.",
          "Place a spoonful of filling in the center of each circle and fold to seal edges.",
          "Steam momos in a steamer for 10-12 minutes until cooked.",
          "Optionally, deep-fry the momos for a crispy version.",
          "Serve hot with spicy red chutney or soy sauce."
        ],
        prepTime: "30 mins",
        cookTime: "15 mins",
        servings: "3-4 people"
      },
      {
        id: 16,
        title: "Chole Bhature",
        category: "Breakfast",
        image: "Chole_Bhature.png",
        description: "A North Indian classic breakfast dish made of spicy chickpeas (chole) served with fluffy deep-fried bread (bhature).",
        ingredients: [
          "1 cup chickpeas (soaked overnight)",
          "1 large onion (finely chopped)",
          "2 tomatoes (pureed)",
          "1 tsp ginger-garlic paste",
          "1 tsp cumin seeds",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tbsp chole masala or garam masala",
          "Salt to taste",
          "2 tbsp oil",
          "Fresh coriander for garnish",
          "For Bhature:",
          "2 cups all-purpose flour (maida)",
          "2 tbsp semolina (sooji)",
          "1/2 cup yogurt (curd)",
          "1/2 tsp baking soda",
          "Salt to taste",
          "Water as needed",
          "Oil for deep frying"
        ],
        instructions: [
          "Pressure cook soaked chickpeas until soft; drain and set aside.",
          "Heat oil in a pan, add cumin seeds, and sauté onions until golden brown.",
          "Add ginger-garlic paste and cook for 1 minute.",
          "Add tomato puree, turmeric, chili powder, and chole masala; cook until oil separates.",
          "Add boiled chickpeas, salt, and a little water; simmer for 10-15 minutes.",
          "For Bhature: Mix flour, semolina, yogurt, baking soda, salt, and water to form a soft dough.",
          "Cover and rest the dough for 1-2 hours.",
          "Divide into portions and roll into circles.",
          "Deep-fry in hot oil until puffed and golden.",
          "Serve hot Bhature with spicy Chole, garnished with coriander and onions."
        ],
        prepTime: "2 hours (including soaking)",
        cookTime: "30 mins",
        servings: "3-4 people"
      },
      {
        id: 17,
        title: "Goan Prawn Curry",
        category: "West Indian",
        image: "GoanPrawnCurry.png",
        description: "A flavorful coastal curry from Goa made with prawns simmered in a rich coconut and tamarind-based gravy infused with aromatic spices.",
        ingredients: [
          "400g prawns (cleaned and deveined)",
          "1 cup grated coconut",
          "1 medium onion (finely chopped)",
          "2 tomatoes (chopped)",
          "2-3 dried red chilies",
          "1 tsp turmeric powder",
          "1 tsp coriander powder",
          "1 tsp cumin seeds",
          "1 small piece of tamarind (soaked in water)",
          "2 cloves garlic",
          "1-inch ginger piece",
          "2 tbsp oil",
          "Salt to taste",
          "Fresh coriander leaves for garnish"
        ],
        instructions: [
          "Grind grated coconut, red chilies, cumin seeds, ginger, garlic, and tamarind into a smooth paste using little water.",
          "Heat oil in a pan, add chopped onions, and sauté until golden brown.",
          "Add chopped tomatoes and cook until soft.",
          "Add the ground coconut paste, turmeric, coriander powder, and salt; sauté for 2-3 minutes.",
          "Add 1 cup water and bring the curry to a gentle boil.",
          "Add prawns and simmer for 8-10 minutes until cooked through.",
          "Garnish with fresh coriander leaves.",
          "Serve hot with steamed rice or Goan red rice."
        ],
        prepTime: "20 mins",
        cookTime: "25 mins",
        servings: "3-4 people"
      },
      {
        id: 18,
        title: "Hyderabadi Biryani",
        category: "South Indian",
        image: "Hyderabadi_Biryani.png",
        description: "A royal and aromatic rice dish from Hyderabad made with layers of fragrant basmati rice, marinated meat, and rich spices cooked together in the traditional dum style.",
        ingredients: [
          "500g basmati rice",
          "500g chicken or mutton (bone-in pieces)",
          "2 large onions (thinly sliced and fried)",
          "1/2 cup yogurt",
          "2 tbsp ginger-garlic paste",
          "2 green chilies (slit)",
          "1/2 tsp turmeric powder",
          "1 tbsp red chili powder",
          "1 tsp garam masala",
          "Fresh coriander and mint leaves (chopped)",
          "Juice of 1 lemon",
          "4 tbsp ghee or oil",
          "Whole spices: bay leaf, cardamom, cloves, cinnamon",
          "Saffron strands soaked in 2 tbsp warm milk",
          "Salt to taste"
        ],
        instructions: [
          "Wash and soak basmati rice for 30 minutes.",
          "Marinate chicken or mutton with yogurt, ginger-garlic paste, turmeric, chili powder, garam masala, lemon juice, mint, coriander, and salt. Let it rest for at least 1 hour.",
          "Cook rice with whole spices until 70% done; drain and set aside.",
          "In a heavy-bottomed pot, spread the marinated meat at the bottom.",
          "Add a layer of half-cooked rice on top, followed by fried onions, saffron milk, and a drizzle of ghee.",
          "Repeat the layers and seal the pot with a tight lid or dough to trap steam.",
          "Cook on low heat (dum) for 25-30 minutes until the meat is tender and rice fully cooked.",
          "Gently mix before serving to combine the layers.",
          "Serve hot with raita and salad."
        ],
        prepTime: "1 hour",
        cookTime: "40 mins",
        servings: "4-5 people"
      },
      {
        id: 19,
        title: "Aloo Puri",
        category: "Breakfast",
        image: "Aloo_Puri.png",
        description: "A classic North Indian breakfast dish made of crispy, deep-fried bread (puri) served with a flavorful and spiced potato curry.",
        ingredients: [
          "For Puri:",
          "2 cups whole wheat flour",
          "1/2 tsp salt",
          "1 tbsp oil",
          "Water as needed",
          "Oil for deep frying",
          "For Aloo Curry:",
          "3 medium potatoes (boiled and cubed)",
          "1 onion (chopped)",
          "2 tomatoes (chopped)",
          "1 tsp ginger-garlic paste",
          "1/2 tsp turmeric powder",
          "1 tsp cumin seeds",
          "1 tsp coriander powder",
          "1 tsp garam masala",
          "1/2 tsp red chili powder",
          "Salt to taste",
          "2 tbsp oil",
          "Fresh coriander leaves for garnish"
        ],
        instructions: [
          "In a bowl, mix flour, salt, and oil. Add water gradually to form a stiff dough. Rest for 15 minutes.",
          "Divide dough into small balls and roll into small circles.",
          "Heat oil in a deep pan and fry puris until puffed and golden brown. Set aside.",
          "For curry, heat oil in a pan and add cumin seeds.",
          "Add onions and sauté until golden, then add ginger-garlic paste and cook for 1 minute.",
          "Add tomatoes, turmeric, chili powder, coriander powder, and salt; cook until oil separates.",
          "Add boiled potatoes and 1 cup of water; simmer for 10 minutes.",
          "Sprinkle garam masala and garnish with coriander leaves.",
          "Serve hot puris with spicy aloo curry."
        ],
        prepTime: "25 mins",
        cookTime: "25 mins",
        servings: "3-4 people"
      },
      {
        id: 20,
        title: "Chingri Malai Curry",
        category: "East Indian",
        image: "Chingri_Malai_Curry.png",
        description: "A rich and creamy Bengali delicacy made with prawns simmered in a coconut milk gravy infused with aromatic spices and a touch of sweetness.",
        ingredients: [
          "400g prawns (cleaned and deveined)",
          "1 cup coconut milk",
          "1 large onion (finely sliced)",
          "1 tomato (chopped)",
          "1 tbsp ginger-garlic paste",
          "2 green chilies (slit)",
          "1/2 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tsp garam masala",
          "2 tbsp mustard oil or vegetable oil",
          "1 bay leaf",
          "1/2 tsp cumin seeds",
          "Salt to taste",
          "Fresh coriander leaves for garnish"
        ],
        instructions: [
          "Marinate prawns with salt and turmeric powder; set aside for 10 minutes.",
          "Heat mustard oil in a pan until slightly smoky and lightly fry the prawns for 1-2 minutes; remove and keep aside.",
          "In the same oil, add bay leaf and cumin seeds. Sauté sliced onions until golden brown.",
          "Add ginger-garlic paste and green chilies; cook for 1 minute.",
          "Add chopped tomatoes, red chili powder, and garam masala; cook until oil separates.",
         "Pour in coconut milk and a little water to make the gravy.",
         "Add fried prawns and simmer for 5-7 minutes on low heat until they are cooked and the gravy thickens.",
         "Adjust salt and garnish with coriander leaves.",
         "Serve hot with steamed basmati rice."
        ],
        prepTime: "20 mins",
        cookTime: "25 mins",
        servings: "3-4 people"
      },
      {
        id: 21,
        title: "Chicken Xacuti",
        category: "West Indian",
        image: "Chicken_Xacuti.png",
        description: "A flavorful Goan curry made with chicken cooked in a rich roasted coconut, poppy seed, and aromatic spice masala.",
        ingredients: [
          "500g chicken (cut into pieces)",
          "2 tbsp oil",
          "2 onions (sliced)",
          "1 tomato (chopped)",
          "1 cup grated coconut",
          "1 tbsp poppy seeds",
          "1 tbsp coriander seeds",
          "1 tsp cumin seeds",
          "4-5 dried red chilies",
          "1-inch cinnamon stick",
          "3-4 cloves",
          "3-4 black peppercorns",
          "2-3 green cardamoms",
          "1 tsp turmeric powder",
          "1 tbsp ginger-garlic paste",
          "1 cup water",
          "Salt to taste",
          "Fresh coriander leaves for garnish"
        ],
        instructions: [
          "Dry roast grated coconut, poppy seeds, red chilies, and whole spices until golden and fragrant; cool and grind into a smooth paste.",
          "Heat oil in a pan, sauté onions until golden brown.",
          "Add ginger-garlic paste and cook for a minute.",
          "Add chopped tomato and cook until soft.",
          "Add chicken pieces, turmeric, and salt; sauté for 5 minutes.",
          "Add the roasted masala paste and mix well.",
          "Pour water as needed to make a thick curry; simmer for 20-25 minutes until chicken is tender and oil separates.",
          "Garnish with fresh coriander leaves and serve hot with steamed rice or Goan pav."
        ],
        prepTime: "25 mins",
        cookTime: "35 mins",
        servings: "3-4 people"
      },
      {
        id: 22,
        title: "Rajma Chawal",
        category: "North Indian",
        image: "Rajma_Chawal.png",
        description: "A comforting North Indian dish featuring red kidney beans simmered in a spiced tomato gravy, served with steamed basmati rice.",
        ingredients: [
          "1 cup rajma (red kidney beans, soaked overnight)",
          "2 cups water (for pressure cooking)",
          "2 medium onions (finely chopped)",
          "2 tomatoes (pureed)",
          "1 tbsp ginger-garlic paste",
          "2 green chilies (slit)",
          "1/2 tsp turmeric powder",
          "1 tsp cumin seeds",
          "1 tsp coriander powder",
          "1 tsp garam masala",
          "1 tsp red chili powder",
          "2 tbsp oil or ghee",
          "Salt to taste",
          "Fresh coriander leaves for garnish",
          "Steamed basmati rice (for serving)"
        ],
        instructions: [
          "Pressure cook soaked rajma with water and a pinch of salt for 4-5 whistles or until soft.",
          "Heat oil in a pan, add cumin seeds, and let them splutter.",
          "Add onions and sauté until golden brown.",
          "Add ginger-garlic paste and green chilies; cook for 1 minute.",
          "Add tomato puree, turmeric, chili powder, coriander powder, and salt; cook until oil separates.",
          "Add boiled rajma along with some of the cooking water; mix well.",
          "Simmer for 15-20 minutes until the curry thickens and flavors blend.",
          "Add garam masala and garnish with fresh coriander leaves.",
          "Serve hot with steamed basmati rice."
        ],
        prepTime: "8 hours (including soaking)",
        cookTime: "40 mins",
        servings: "3-4 people"
      },
      {
        id: 23,
        title: "Paneer Butter Masala",
        category: "Veg Food",
        image: "PaneerButterMasala.png",
        description: "A rich and creamy North Indian curry made with soft paneer cubes simmered in a buttery tomato-based gravy infused with aromatic spices.",
        ingredients: [
          "200g paneer (cubed)",
         "2 large tomatoes (pureed)",
          "1 onion (finely chopped)",
          "1 tbsp ginger-garlic paste",
          "2 tbsp butter",
          "1 tbsp fresh cream",
          "1 tbsp oil",
          "1/2 tsp cumin seeds",
          "1/2 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tsp garam masala",
          "1 tsp coriander powder",
          "1/2 tsp kasuri methi (dried fenugreek leaves)",
          "Salt to taste",
          "Fresh coriander leaves for garnish"
        ],
        instructions: [
          "Heat oil and butter in a pan, add cumin seeds, and let them splutter.",
          "Add chopped onions and sauté until golden brown.",
          "Add ginger-garlic paste and cook for a minute.",
          "Add tomato puree, turmeric, chili powder, coriander powder, and salt; cook until oil separates.",
          "Add a little water and bring the gravy to a gentle boil.",
          "Add paneer cubes and simmer for 5-7 minutes.",
          "Stir in cream, garam masala, and crushed kasuri methi.",
          "Cook for another 2-3 minutes on low heat.",
          "Garnish with fresh coriander leaves and serve hot with naan, roti, or steamed rice."
        ],
        prepTime: "15 mins",
        cookTime: "25 mins",
        servings: "3-4 people"
      },
      {
        id: 24,
        title: "Paneer Tikka",
        category: "Starter",
        image: "Paneer_Tikka.png",
        description: "A popular North Indian appetizer made with cubes of paneer marinated in yogurt and spices, grilled or baked to perfection.",
        ingredients: [
          "250g paneer (cubed)",
          "1/2 cup thick yogurt",
          "1 tbsp ginger-garlic paste",
          "1 tsp red chili powder",
          "1/2 tsp turmeric powder",
          "1 tsp garam masala",
          "1 tsp cumin powder",
          "1 tsp coriander powder",
          "1 tbsp lemon juice",
          "1 tbsp oil",
          "Salt to taste",
          "1 onion, 1 capsicum, cut into cubes (for skewering, optional)",
          "Wooden or metal skewers"
        ],
        instructions: [
          "In a bowl, mix yogurt, ginger-garlic paste, red chili powder, turmeric, garam masala, cumin, coriander powder, lemon juice, oil, and salt to make the marinade.",
          "Add paneer cubes (and vegetables if using) to the marinade; coat well and refrigerate for at least 1 hour.",
          "Preheat grill, oven, or stovetop pan.",
          "Thread marinated paneer (and vegetables) onto skewers.",
          "Grill or bake at 200°C for 10-15 minutes, turning occasionally until paneer is lightly charred.",
          "Serve hot with mint chutney and lemon wedges."
        ],
        prepTime: "15 mins",
        cookTime: "15 mins",
        servings: "2-3 people"
      }
    ];

    const foundRecipe = recipes.find(r => r.id === parseInt(id));
    if (foundRecipe) setRecipe(foundRecipe);

    const storedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
    setComments(storedComments);

    if (storedComments.length > 0) {
      const avg = storedComments.reduce((sum, c) => sum + (Number(c.rating) || 0), 0) / storedComments.length;
      setAverageRating(Number(avg.toFixed(1)));
    }

    setLoading(false);
  }, [id]);

  const handleAdd = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      alert("Please log in to add favorites.");
      return;
    }

    const allFav = JSON.parse(localStorage.getItem("favoritesByUser")) || {};
    const userFav = allFav[user.email] || [];

    if (userFav.some((r) => r.id === recipe.id)) {
      alert("This recipe is already in your favorites!");
      return;
    }

    const updated = [...userFav, recipe];
    allFav[user.email] = updated;
    localStorage.setItem("favoritesByUser", JSON.stringify(allFav));
    
    window.dispatchEvent(new Event("favoritesUpdated"));
    
    alert(`${recipe.title} has been added to your favorites ❤️`);
  };

  if (loading) return <div className="recipe-details-container">Loading...</div>;

  if (!recipe) {
    return (
      <div className="recipe-details-container">
        <h1>Recipe not found</h1>
        <button onClick={handleBackNavigation}>Back to Recipes</button>
      </div>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      user: "Current User",
      text: newComment,
      rating,
      date: new Date().toLocaleString(),
    };

    const updated = [...comments, commentData];
    setComments(updated);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updated));

    const avg = updated.reduce((sum, c) => sum + (Number(c.rating) || 0), 0) / updated.length;
    setAverageRating(Number(avg.toFixed(1)));

    setNewComment("");
    setRating(0);
  };

  const handleDeleteComment = (indexToDelete) => {
    const updated = comments.filter((_, idx) => idx !== indexToDelete);
    setComments(updated);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updated));

    const avg = updated.length > 0
      ? updated.reduce((sum, c) => sum + (Number(c.rating) || 0), 0) / updated.length
      : 0;
    setAverageRating(Number(avg.toFixed(1)));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: "Check out this recipe!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Recipe link copied to clipboard!");
    }
  };

  const handleBackNavigation = () => {
    const sourcePage = location.state?.from || 'allrecipe';
    navigate(`/${sourcePage}`);
  };

  return (
    <div className="recipe-details-container">
      <button className="back-btn" onClick={handleBackNavigation}>
        ← Back to Recipes
      </button>

      <div className="recipe-header">
        <div className="image-wrapper">
          <img src={`/${recipe.image}`} alt={recipe.title} className="recipe-image" />
          <div className="action-buttons">
            <button className="share-btn" onClick={handleShare}>📤 Share Recipe</button>
            <button className="favorite-btn" onClick={handleAdd}>❤️ Add to Favorites</button>
          </div>
        </div>

        <div className="recipe-meta">
          <h1>{recipe.title}</h1>
          <p className="category">{recipe.category}</p>
          <p className="description">{recipe.description}</p>
          <p className="avg-rating">Average Rating: {averageRating} ⭐</p>

          <div className="recipe-stats">
            <div className="stat">
              <span className="stat-label">Prep Time:</span>
              <span className="stat-value">{recipe.prepTime}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Cook Time:</span>
              <span className="stat-value">{recipe.cookTime}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Servings:</span>
              <span className="stat-value">{recipe.servings}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>🍽️ Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>👨‍🍳 Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2>Comments & Reviews</h2>
        <form className="comment-form" onSubmit={handleAddComment}>
          <textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={rating >= star ? "star active" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button type="submit">Post Comment</button>
        </form>

        <div className="comment-list">
          {comments.map((c, index) => (
            <div key={index} className="comment-card">
              <div className="comment-header">
                <strong>{c.user}</strong>
                <span>⭐ {c.rating}</span>
              </div>
              <p>{c.text}</p>
              <div className="comment-footer">
                <small>{c.date}</small>
                <button className="delete-comment" onClick={() => handleDeleteComment(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
