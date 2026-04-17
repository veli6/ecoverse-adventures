const questions = [
  // --- CLIMATE ---
  // Level 1 - Kid
  { id: "climate-1-kid-1", theme: "Climate", level: 1, ageGroup: "Kid", question: "Which of these helps the planet stay cool?", options: ["Cutting trees", "Planting trees", "Leaving lights on", "Driving cars"], correctAnswer: 1 },
  { id: "climate-1-kid-2", theme: "Climate", level: 1, ageGroup: "Kid", question: "What is the sun used for in 'solar' power?", options: ["Cooking", "Electricity", "Making rain", "Painting"], correctAnswer: 1 },
  { id: "climate-1-kid-3", theme: "Climate", level: 1, ageGroup: "Kid", question: "What should you do with lights when leaving a room?", options: ["Leave on", "Turn off", "Break them", "Nothing"], correctAnswer: 1 },
  { id: "climate-1-kid-4", theme: "Climate", level: 1, ageGroup: "Kid", question: "Which animal likes the cold Arctic ice?", options: ["Lion", "Elephant", "Polar Bear", "Monkey"], correctAnswer: 2 },
  { id: "climate-1-kid-5", theme: "Climate", level: 1, ageGroup: "Kid", question: "Best way to travel nearby?", options: ["Plane", "Truck", "Walk or bike", "Rocket"], correctAnswer: 2 },
  // Level 1 - Teen
  { id: "climate-1-teen-1", theme: "Climate", level: 1, ageGroup: "Teen", question: "Main cause of global warming?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 2 },
  { id: "climate-1-teen-2", theme: "Climate", level: 1, ageGroup: "Teen", question: "Which is renewable?", options: ["Coal", "Solar Power", "Natural Gas", "Oil"], correctAnswer: 1 },
  { id: "climate-1-teen-3", theme: "Climate", level: 1, ageGroup: "Teen", question: "Effect of Earth warming?", options: ["Ice melts", "More ice", "Nothing", "Tides stop"], correctAnswer: 0 },
  { id: "climate-1-teen-4", theme: "Climate", level: 1, ageGroup: "Teen", question: "What is Greenhouse Effect?", options: ["Green paint", "Gases trapping heat", "Gardens", "Vegetables"], correctAnswer: 1 },
  { id: "climate-1-teen-5", theme: "Climate", level: 1, ageGroup: "Teen", question: "Highest carbon footprint?", options: ["Biking", "Local food", "Flying", "Walking"], correctAnswer: 2 },
  // Level 1 - Adult
  { id: "climate-1-adult-1", theme: "Climate", level: 1, ageGroup: "Adult", question: "Paris Agreement goal?", options: ["New cities", "1.5°C limit", "More oil", "Plastic reduction"], correctAnswer: 1 },
  { id: "climate-1-adult-2", theme: "Climate", level: 1, ageGroup: "Adult", question: "What is Net Zero?", options: ["Zero people", "Balance emitted/removed CO2", "No web", "Zero waste"], correctAnswer: 1 },
  { id: "climate-1-adult-3", theme: "Climate", level: 1, ageGroup: "Adult", question: "Top GHG emitting sector?", options: ["Agri", "Transport", "Energy", "Fashion"], correctAnswer: 2 },
  { id: "climate-1-adult-4", theme: "Climate", level: 1, ageGroup: "Adult", question: "What is IPCC?", options: ["Plastic Corp", "Climate Panel", "Planet Center", "Power Committee"], correctAnswer: 1 },
  { id: "climate-1-adult-5", theme: "Climate", level: 1, ageGroup: "Adult", question: "Climate change definition?", options: ["Daily weather", "Long-term shifts", "Seasonality", "Tides"], correctAnswer: 1 },

  // Level 2 - Kid
  { id: "climate-2-kid-1", theme: "Climate", level: 2, ageGroup: "Kid", question: "What is a 'solar panel'?", options: ["Mirror", "Heat catcher", "Electricity maker from sun", "Table"], correctAnswer: 2 },
  { id: "climate-2-kid-2", theme: "Climate", level: 2, ageGroup: "Kid", question: "Where should trees go?", options: ["Everywhere", "Inside only", "In the sea", "In a box"], correctAnswer: 0 },
  { id: "climate-2-kid-3", theme: "Climate", level: 2, ageGroup: "Kid", question: "Is recycling good?", options: ["No", "Yes", "Maybe", "Sometimes"], correctAnswer: 1 },
  { id: "climate-2-kid-4", theme: "Climate", level: 2, ageGroup: "Kid", question: "Zero gas transport?", options: ["Car", "Bike", "Plane", "Bus"], correctAnswer: 1 },
  { id: "climate-2-kid-5", theme: "Climate", level: 2, ageGroup: "Kid", question: "Hot ice means?", options: ["More ice", "Melted ice", "Green ice", "Hard ice"], correctAnswer: 1 },
  // Level 2 - Teen
  { id: "climate-2-teen-1", theme: "Climate", level: 2, ageGroup: "Teen", question: "Which is a fossil fuel?", options: ["Wind", "Solar", "Coal", "Water"], correctAnswer: 2 },
  { id: "climate-2-teen-2", theme: "Climate", level: 2, ageGroup: "Teen", question: "Ocean acidification cause?", options: ["Salt", "CO2 absorption", "Fish", "Plastic"], correctAnswer: 1 },
  { id: "climate-2-teen-3", theme: "Climate", level: 2, ageGroup: "Teen", question: "Melting sea ice affects?", options: ["Monkeys", "Polar bears", "Lions", "Camels"], correctAnswer: 1 },
  { id: "climate-2-teen-4", theme: "Climate", level: 2, ageGroup: "Teen", question: "What is a carbon sink?", options: ["Kitchen sink", "Forests/Oceans", "Mine", "Factory"], correctAnswer: 1 },
  { id: "climate-2-teen-5", theme: "Climate", level: 2, ageGroup: "Teen", question: "Global warming impact?", options: ["Bigger Arctic", "Extreme weather", "Less rain only", "No sun"], correctAnswer: 1 },
  // Level 2 - Adult
  { id: "climate-2-adult-1", theme: "Climate", level: 2, ageGroup: "Adult", question: "Methane source?", options: ["Rice fields", "Livestock", "Landfills", "All above"], correctAnswer: 3 },
  { id: "climate-2-adult-2", theme: "Climate", level: 2, ageGroup: "Adult", question: "Albedo effect?", options: ["Light absorption", "Light reflection", "Heat storage", "Air flow"], correctAnswer: 1 },
  { id: "climate-2-adult-3", theme: "Climate", level: 2, ageGroup: "Adult", question: "Carbon pricing?", options: ["Tax on emissions", "Selling coal", "Buying trees", "Free energy"], correctAnswer: 0 },
  { id: "climate-2-adult-4", theme: "Climate", level: 2, ageGroup: "Adult", question: "Tipping point?", options: ["Small change", "Irreversible threshold", "Ice melting slowly", "Wind shift"], correctAnswer: 1 },
  { id: "climate-2-adult-5", theme: "Climate", level: 2, ageGroup: "Adult", question: "Deforestation effect?", options: ["More O2", "Loss of biodiversity/Carbon", "Better soil", "Cooler air"], correctAnswer: 1 },

  // Level 3 - Kid
  { id: "climate-3-kid-1", theme: "Climate", level: 3, ageGroup: "Kid", question: "What is 'renewable'?", options: ["Never ends", "Dirty", "Old", "Slow"], correctAnswer: 0 },
  { id: "climate-3-kid-2", theme: "Climate", level: 3, ageGroup: "Kid", question: "Wind turbine power?", options: ["Sun", "Wind", "Water", "Coal"], correctAnswer: 1 },
  { id: "climate-3-kid-3", theme: "Climate", level: 3, ageGroup: "Kid", question: "Does meat help Earth?", options: ["Yes", "No, plants are better", "Maybe", "Always"], correctAnswer: 1 },
  { id: "climate-3-kid-4", theme: "Climate", level: 3, ageGroup: "Kid", question: "Protecting nature?", options: ["Cut trees", "Save animals", "Burn trash", "Build mall"], correctAnswer: 1 },
  { id: "climate-3-kid-5", theme: "Climate", level: 3, ageGroup: "Kid", question: "Earth's blanket?", options: ["Atmosphere", "Clouds", "Space", "Ground"], correctAnswer: 0 },
  // Level 3 - Teen
  { id: "climate-3-teen-1", theme: "Climate", level: 3, ageGroup: "Teen", question: "Permafrost melting risk?", options: ["New land", "Methane release", "Colder air", "More snow"], correctAnswer: 1 },
  { id: "climate-3-teen-2", theme: "Climate", level: 3, ageGroup: "Teen", question: "COP meetings purpose?", options: ["Trade", "Climate action", "War", "Sports"], correctAnswer: 1 },
  { id: "climate-3-teen-3", theme: "Climate", level: 3, ageGroup: "Teen", question: "Anthropogenic means?", options: ["Natural", "Human-caused", "Ancient", "Space-based"], correctAnswer: 1 },
  { id: "climate-3-teen-4", theme: "Climate", level: 3, ageGroup: "Teen", question: "Climate vs Weather?", options: ["Same", "Long-term vs Short-term", "Rain vs Sun", "Old vs New"], correctAnswer: 1 },
  { id: "climate-3-teen-5", theme: "Climate", level: 3, ageGroup: "Teen", question: "Solar cell efficiency?", options: ["100%", "Approx 20%", "50%", "5%"], correctAnswer: 1 },
  // Level 3 - Adult
  { id: "climate-3-adult-1", theme: "Climate", level: 3, ageGroup: "Adult", question: "Radiative forcing?", options: ["Light power", "Energy balance change", "Wind speed", "Gravity"], correctAnswer: 1 },
  { id: "climate-3-adult-2", theme: "Climate", level: 3, ageGroup: "Adult", question: "Ocean conveyor belt?", options: ["Fish movement", "Thermohaline circulation", "Waves", "Tides"], correctAnswer: 1 },
  { id: "climate-3-adult-3", theme: "Climate", level: 3, ageGroup: "Adult", question: "Carbon sequestration?", options: ["Burning coal", "Capturing/storing CO2", "Selling carbon", "Mining"], correctAnswer: 1 },
  { id: "climate-3-adult-4", theme: "Climate", level: 3, ageGroup: "Adult", question: "Mitigation vs Adaptation?", options: ["Same", "Reducing vs Coping", "Buying vs Selling", "Hot vs Cold"], correctAnswer: 1 },
  { id: "climate-3-adult-5", theme: "Climate", level: 3, ageGroup: "Adult", question: "Kyoto Protocol focus?", options: ["Plastic", "Emission reductions", "Water", "Forests"], correctAnswer: 1 },

  // Level 4 - Kid
  { id: "climate-4-kid-1", theme: "Climate", level: 4, ageGroup: "Kid", question: "What is compost?", options: ["Magic", "Rotting food for plants", "Trash", "Toy"], correctAnswer: 1 },
  { id: "climate-4-kid-2", theme: "Climate", level: 4, ageGroup: "Kid", question: "Bees help by?", options: ["Stinging", "Pollinating", "Sleeping", "Dancing"], correctAnswer: 1 },
  { id: "climate-4-kid-3", theme: "Climate", level: 4, ageGroup: "Kid", question: "Oceans help Earth?", options: ["Yes, absorb heat", "No, too big", "Maybe", "Only for fish"], correctAnswer: 0 },
  { id: "climate-4-kid-4", theme: "Climate", level: 4, ageGroup: "Kid", question: "Save water by?", options: ["Tap off", "Tap on", "Short shower", "Both A/C"], correctAnswer: 3 },
  { id: "climate-4-kid-5", theme: "Climate", level: 4, ageGroup: "Kid", question: "Earth Day is?", options: ["April 22", "Jan 1", "Dec 25", "Halloween"], correctAnswer: 0 },
  // Level 4 - Teen
  { id: "climate-4-teen-1", theme: "Climate", level: 4, ageGroup: "Teen", question: "Feedback loops?", options: ["Repeat", "Amplify changes", "Stop climate", "Cooling"], correctAnswer: 1 },
  { id: "climate-4-teen-2", theme: "Climate", level: 4, ageGroup: "Teen", question: "GHG Global Warming Potential?", options: ["Size", "Heat trapping capacity", "Weight", "Speed"], correctAnswer: 1 },
  { id: "climate-4-teen-3", theme: "Climate", level: 4, ageGroup: "Teen", question: "Greenwashing?", options: ["Cleaning", "Misleading eco-claims", "Painting", "Gardening"], correctAnswer: 1 },
  { id: "climate-4-teen-4", theme: "Climate", level: 4, ageGroup: "Teen", question: "Transition risk?", options: ["Moving", "Economic shift to green", "Running", "Falling"], correctAnswer: 1 },
  { id: "climate-4-teen-5", theme: "Climate", level: 4, ageGroup: "Teen", question: "Circular economy?", options: ["Round", "Reducing waste/reuse", "Flat", "Selling"], correctAnswer: 1 },
  // Level 4 - Adult
  { id: "climate-4-adult-1", theme: "Climate", level: 4, ageGroup: "Adult", question: "Climate sensitivity?", options: ["Feeling", "Temp rise per doubled CO2", "Sensitivity to sun", "Rainfall"], correctAnswer: 1 },
  { id: "climate-4-adult-2", theme: "Climate", level: 4, ageGroup: "Adult", question: "Scope 3 emissions?", options: ["Direct", "Electricity", "Value chain", "Flights only"], correctAnswer: 2 },
  { id: "climate-4-adult-3", theme: "Climate", level: 4, ageGroup: "Adult", question: "Stratospheric cooling?", options: ["Wind", "CO2 effect aloft", "Sun", "Ice"], correctAnswer: 1 },
  { id: "climate-4-adult-4", theme: "Climate", level: 4, ageGroup: "Adult", question: "Negative emissions?", options: ["Bad", "CO2 removal", "Less rain", "None"], correctAnswer: 1 },
  { id: "climate-4-adult-5", theme: "Climate", level: 4, ageGroup: "Adult", question: "Social cost of carbon?", options: ["Price", "Economic damage per ton", "Tax", "Fee"], correctAnswer: 1 },

  // Level 5 - Kid
  { id: "climate-5-kid-1", theme: "Climate", level: 5, ageGroup: "Kid", question: "Can kids help Earth?", options: ["No", "Yes, small steps", "Maybe", "Later"], correctAnswer: 1 },
  { id: "climate-5-kid-2", theme: "Climate", level: 5, ageGroup: "Kid", question: "Sharing toys helps?", options: ["Yes, less waste", "No", "Maybe", "Sometimes"], correctAnswer: 0 },
  { id: "climate-5-kid-3", theme: "Climate", level: 5, ageGroup: "Kid", question: "Turn off iPad?", options: ["Save energy", "No", "Play more", "Charging"], correctAnswer: 0 },
  { id: "climate-5-kid-4", theme: "Climate", level: 5, ageGroup: "Kid", question: "Love nature?", options: ["Protect it", "Break it", "Ignore it", "Watch TV"], correctAnswer: 0 },
  { id: "climate-5-kid-5", theme: "Climate", level: 5, ageGroup: "Kid", question: "Be an EcoWarrior?", options: ["Yes!", "No", "Later", "Maybe"], correctAnswer: 0 },
  // Level 5 - Teen
  { id: "climate-5-teen-1", theme: "Climate", level: 5, ageGroup: "Teen", question: "Divestment?", options: ["Investing", "Withdrawing from fossils", "Selling", "Buying"], correctAnswer: 1 },
  { id: "climate-5-teen-2", theme: "Climate", level: 5, ageGroup: "Teen", question: "Intergenerational equity?", options: ["Fairness to future", "Old people", "Money", "Taxes"], correctAnswer: 0 },
  { id: "climate-5-teen-3", theme: "Climate", level: 5, ageGroup: "Teen", question: "Regenerative agriculture?", options: ["Old", "Soil-restoring", "Chemical", "Milling"], correctAnswer: 1 },
  { id: "climate-5-teen-4", theme: "Climate", level: 5, ageGroup: "Teen", question: "Climate justice?", options: ["Law", "Ethical dimension", "Police", "Penalty"], correctAnswer: 1 },
  { id: "climate-5-teen-5", theme: "Climate", level: 5, ageGroup: "Teen", question: "Systemic change?", options: ["Small", "Overhauling systems", "Fast", "Slow"], correctAnswer: 1 },
  // Level 5 - Adult
  { id: "climate-5-adult-1", theme: "Climate", level: 5, ageGroup: "Adult", question: "Earth system models?", options: ["Toys", "Complex simulations", "Maps", "Charts"], correctAnswer: 1 },
  { id: "climate-5-adult-2", theme: "Climate", level: 5, ageGroup: "Adult", question: "Degrowth?", options: ["Growing", "Resource reduction focus", "Shrinking", "Milling"], correctAnswer: 1 },
  { id: "climate-5-adult-3", theme: "Climate", level: 5, ageGroup: "Adult", question: "Planetary boundaries?", options: ["Limits to safe Earth", "Maps", "Walls", "Fences"], correctAnswer: 0 },
  { id: "climate-5-adult-4", theme: "Climate", level: 5, ageGroup: "Adult", question: "Just transition?", options: ["Fair shift for workers", "Fast move", "Slow", "None"], correctAnswer: 0 },
  { id: "climate-5-adult-5", theme: "Climate", level: 5, ageGroup: "Adult", question: "ESG metrics?", options: ["Scores", "Env/Social/Gov criteria", "Money", "Sales"], correctAnswer: 1 },

  // --- WILDLIFE ---
  // Level 1 - Kid
  { id: "wildlife-1-kid-1", theme: "Wildlife", level: 1, ageGroup: "Kid", question: "Tigers live where?", options: ["Jungle", "Sea", "Sky", "Mall"], correctAnswer: 0 },
  { id: "wildlife-1-kid-2", theme: "Wildlife", level: 1, ageGroup: "Kid", question: "Long neck animal?", options: ["Hippo", "Giraffe", "Rabbit", "Dog"], correctAnswer: 1 },
  { id: "wildlife-1-kid-3", theme: "Wildlife", level: 1, ageGroup: "Kid", question: "Bees make?", options: ["Milk", "Honey", "Juice", "Wax"], correctAnswer: 1 },
  { id: "wildlife-1-kid-4", theme: "Wildlife", level: 1, ageGroup: "Kid", question: "Baby frog?", options: ["Pup", "Tadpole", "Chick", "Kitten"], correctAnswer: 1 },
  { id: "wildlife-1-kid-5", theme: "Wildlife", level: 1, ageGroup: "Kid", question: "Bird home?", options: ["Nest", "Cave", "Ocean", "Car"], correctAnswer: 0 },
  // Level 1 - Teen
  { id: "wildlife-1-teen-1", theme: "Wildlife", level: 1, ageGroup: "Teen", question: "Endangered definition?", options: ["Dangerous", "Risk of extinction", "Fast", "Small"], correctAnswer: 1 },
  { id: "wildlife-1-teen-2", theme: "Wildlife", level: 1, ageGroup: "Teen", question: "Main wildlife threat?", options: ["Old age", "Habitat loss", "Food", "Cold"], correctAnswer: 1 },
  { id: "wildlife-1-teen-3", theme: "Wildlife", level: 1, ageGroup: "Teen", question: "What is poaching?", options: ["Cooking", "Illegal hunting", "Fishing", "Training"], correctAnswer: 1 },
  { id: "wildlife-1-teen-4", theme: "Wildlife", level: 1, ageGroup: "Teen", question: "Migratory animals?", options: ["Sleep", "Travel far seasonally", "Run", "Hide"], correctAnswer: 1 },
  { id: "wildlife-1-teen-5", theme: "Wildlife", level: 1, ageGroup: "Teen", question: "Herbivore eats?", options: ["Meat", "Plants", "Bugs", "Rocks"], correctAnswer: 1 },
  // Level 1 - Adult
  { id: "wildlife-1-adult-1", theme: "Wildlife", level: 1, ageGroup: "Adult", question: "Biodiversity?", options: ["Technology", "Variety of life", "Diet", "Biology"], correctAnswer: 1 },
  { id: "wildlife-1-adult-2", theme: "Wildlife", level: 1, ageGroup: "Adult", question: "Keystone species?", options: ["Stone-eater", "Critical impact on system", "Large animal", "Extinct"], correctAnswer: 1 },
  { id: "wildlife-1-adult-3", theme: "Wildlife", level: 1, ageGroup: "Adult", question: "IUCN Red List?", options: ["Colors", "Threatened species info", "Maps", "Phones"], correctAnswer: 1 },
  { id: "wildlife-1-adult-4", theme: "Wildlife", level: 1, ageGroup: "Adult", question: "Invasive species?", options: ["Big", "Non-native harming eco", "Small", "Rare"], correctAnswer: 1 },
  { id: "wildlife-1-adult-5", theme: "Wildlife", level: 1, ageGroup: "Adult", question: "Rewilding?", options: ["Camping", "Restoring wilderness", "Zoos", "Gardens"], correctAnswer: 1 },

  // Level 2 - Kid
  { id: "wildlife-2-kid-1", theme: "Wildlife", level: 2, ageGroup: "Kid", question: "Where do monkeys live?", options: ["Trees", "Ocean", "Desert", "Ice"], correctAnswer: 0 },
  { id: "wildlife-2-kid-2", theme: "Wildlife", level: 2, ageGroup: "Kid", question: "Elephants use trunks to?", options: ["Drink water", "Fly", "Dance", "Sleep"], correctAnswer: 0 },
  { id: "wildlife-2-kid-3", theme: "Wildlife", level: 2, ageGroup: "Kid", question: "Kangaroo baby is a?", options: ["Puppy", "Joey", "Kitten", "Chick"], correctAnswer: 1 },
  { id: "wildlife-2-kid-4", theme: "Wildlife", level: 2, ageGroup: "Kid", question: "Zebras have?", options: ["Spots", "Stripes", "Wings", "Horns"], correctAnswer: 1 },
  { id: "wildlife-2-kid-5", theme: "Wildlife", level: 2, ageGroup: "Kid", question: "Owl is active at?", options: ["Day", "Night", "Noon", "Morning"], correctAnswer: 1 },
  // Level 2 - Teen
  { id: "wildlife-2-teen-1", theme: "Wildlife", level: 2, ageGroup: "Teen", question: "What is an ecosystem?", options: ["A computer", "Living things + environment", "A forest only", "Space"], correctAnswer: 1 },
  { id: "wildlife-2-teen-2", theme: "Wildlife", level: 2, ageGroup: "Teen", question: "Camouflage helps animals?", options: ["Eat", "Hide from predators", "Fly", "Sing"], correctAnswer: 1 },
  { id: "wildlife-2-teen-3", theme: "Wildlife", level: 2, ageGroup: "Teen", question: "Whale sharks eat?", options: ["People", "Plankton", "Tigers", "Birds"], correctAnswer: 1 },
  { id: "wildlife-2-teen-4", theme: "Wildlife", level: 2, ageGroup: "Teen", question: "Apex predator?", options: ["Grass", "Top of food chain", "Small bug", "Plant"], correctAnswer: 1 },
  { id: "wildlife-2-teen-5", theme: "Wildlife", level: 2, ageGroup: "Teen", question: "Hibernation?", options: ["Running", "Deep sleep in winter", "Flying", "Swimming"], correctAnswer: 1 },
  // Level 2 - Adult
  { id: "wildlife-2-adult-1", theme: "Wildlife", level: 2, ageGroup: "Adult", question: "Endemic species?", options: ["Widespread", "Native to one place", "Extinct", "Big"], correctAnswer: 1 },
  { id: "wildlife-2-adult-2", theme: "Wildlife", level: 2, ageGroup: "Adult", question: "Trophic cascade?", options: ["Water", "Chain reaction in ecosystem", "Mountain", "Wind"], correctAnswer: 1 },
  { id: "wildlife-2-adult-3", theme: "Wildlife", level: 2, ageGroup: "Adult", question: "Corridor for wildlife?", options: ["Room", "Safe path between habitats", "Road", "Fence"], correctAnswer: 1 },
  { id: "wildlife-2-adult-4", theme: "Wildlife", level: 2, ageGroup: "Adult", question: "Flagship species?", options: ["Common", "Iconic species for conservation", "Dead", "Small"], correctAnswer: 1 },
  { id: "wildlife-2-adult-5", theme: "Wildlife", level: 2, ageGroup: "Adult", question: "Ex-situ conservation?", options: ["In nature", "Outside natural habitat (Zoos)", "Both", "None"], correctAnswer: 1 },

  // Level 3 - Kid
  { id: "wildlife-3-kid-1", theme: "Wildlife", level: 3, ageGroup: "Kid", question: "Bees help flowers?", options: ["Yes, pollinate", "No", "Maybe", "Later"], correctAnswer: 0 },
  { id: "wildlife-3-kid-2", theme: "Wildlife", level: 3, ageGroup: "Kid", question: "Dolphins are?", options: ["Fish", "Mammals", "Birds", "Rocks"], correctAnswer: 1 },
  { id: "wildlife-3-kid-3", theme: "Wildlife", level: 3, ageGroup: "Kid", question: "Camel hump stores?", options: ["Water", "Fat for energy", "Sand", "Milk"], correctAnswer: 1 },
  { id: "wildlife-3-kid-4", theme: "Wildlife", level: 3, ageGroup: "Kid", question: "Penguin lives in?", options: ["Jungle", "Antarctica", "Desert", "City"], correctAnswer: 1 },
  { id: "wildlife-3-kid-5", theme: "Wildlife", level: 3, ageGroup: "Kid", question: "Turtles have?", options: ["Fur", "Shells", "Feathers", "Wings"], correctAnswer: 1 },
  // Level 3 - Teen
  { id: "wildlife-3-teen-1", theme: "Wildlife", level: 3, ageGroup: "Teen", question: "Symbiosis?", options: ["Fighting", "Living together", "Running", "Sleeping"], correctAnswer: 1 },
  { id: "wildlife-3-teen-2", theme: "Wildlife", level: 3, ageGroup: "Teen", question: "Pesticides impact?", options: ["Good for bees", "Harming pollinators", "Nothing", "Better food"], correctAnswer: 1 },
  { id: "wildlife-3-teen-3", theme: "Wildlife", level: 3, ageGroup: "Teen", question: "Great Barrier Reef?", options: ["Forest", "Coral ecosystem", "Desert", "Ice"], correctAnswer: 1 },
  { id: "wildlife-3-teen-4", theme: "Wildlife", level: 3, ageGroup: "Teen", question: "Decomposers?", options: ["Makers", "Fungi/Bacteria", "Animals", "Sun"], correctAnswer: 1 },
  { id: "wildlife-3-teen-5", theme: "Wildlife", level: 3, ageGroup: "Teen", question: "Wetlands habitat?", options: ["Dry", "Swamps/Marshes", "Ice", "Space"], correctAnswer: 1 },
  // Level 3 - Adult
  { id: "wildlife-3-adult-1", theme: "Wildlife", level: 3, ageGroup: "Adult", question: "Genetic diversity?", options: ["Same", "Variation within species", "Money", "Taxes"], correctAnswer: 1 },
  { id: "wildlife-3-adult-2", theme: "Wildlife", level: 3, ageGroup: "Adult", question: "CITES treaty?", options: ["War", "Illegal wildlife trade ban", "Water", "Forests"], correctAnswer: 1 },
  { id: "wildlife-3-adult-3", theme: "Wildlife", level: 3, ageGroup: "Adult", question: "Hotspots of biodiversity?", options: ["Cold", "Rich but threatened areas", "Maps", "Phones"], correctAnswer: 1 },
  { id: "wildlife-3-adult-4", theme: "Wildlife", level: 3, ageGroup: "Adult", question: "Ecosystem services?", options: ["Money", "Nature's benefits to humans", "Sales", "Ads"], correctAnswer: 1 },
  { id: "wildlife-3-adult-5", theme: "Wildlife", level: 3, ageGroup: "Adult", question: "Extinction rate today?", options: ["Low", "100-1000x natural rate", "Zero", "Normal"], correctAnswer: 1 },

  // Level 4 - Kid
  { id: "wildlife-4-kid-1", theme: "Wildlife", level: 4, ageGroup: "Kid", question: "Forests are home to?", options: ["Many animals", "None", "Cars", "TVs"], correctAnswer: 0 },
  { id: "wildlife-4-kid-2", theme: "Wildlife", level: 4, ageGroup: "Kid", question: "Protecting habitats?", options: ["Helps animals", "Bad", "Mean", "Loud"], correctAnswer: 0 },
  { id: "wildlife-4-kid-3", theme: "Wildlife", level: 4, ageGroup: "Kid", question: "Plastic in sea?", options: ["Hurts fish", "Good", "Funny", "Pretty"], correctAnswer: 0 },
  { id: "wildlife-4-kid-4", theme: "Wildlife", level: 4, ageGroup: "Kid", question: "Feeding wild animals?", options: ["Can be bad", "Good", "Funny", "Always"], correctAnswer: 0 },
  { id: "wildlife-4-kid-5", theme: "Wildlife", level: 4, ageGroup: "Kid", question: "Eco-Park?", options: ["Safe for nature", "Dirty", "Loud", "Mall"], correctAnswer: 0 },
  // Level 4 - Teen
  { id: "wildlife-4-teen-1", theme: "Wildlife", level: 4, ageGroup: "Teen", question: "Habitat fragmentation?", options: ["Growth", "Breaking into small pieces", "Water", "Air"], correctAnswer: 1 },
  { id: "wildlife-4-teen-2", theme: "Wildlife", level: 4, ageGroup: "Teen", question: "Biophilia?", options: ["Love of nature", "Scared of nature", "Biology", "Rocks"], correctAnswer: 0 },
  { id: "wildlife-4-teen-3", theme: "Wildlife", level: 4, ageGroup: "Teen", question: "Indicator species?", options: ["Common", "Reflects eco-health", "Big", "Dead"], correctAnswer: 1 },
  { id: "wildlife-4-teen-4", theme: "Wildlife", level: 4, ageGroup: "Teen", question: "Zoonotic diseases?", options: ["Zoo", "Jump from animals to humans", "Space", "Ground"], correctAnswer: 1 },
  { id: "wildlife-4-teen-5", theme: "Wildlife", level: 4, ageGroup: "Teen", question: "Sustainable fishing?", options: ["Overfishing", "Keeping populations healthy", "Bad", "Loud"], correctAnswer: 1 },
  // Level 4 - Adult
  { id: "wildlife-4-adult-1", theme: "Wildlife", level: 4, ageGroup: "Adult", question: "Edge effect?", options: ["Center", "Changes at habitat borders", "Mountain", "Desert"], correctAnswer: 1 },
  { id: "wildlife-4-adult-2", theme: "Wildlife", level: 4, ageGroup: "Adult", question: "Phylogenetic diversity?", options: ["Same", "Evolutionary breadth", "Money", "Taxes"], correctAnswer: 1 },
  { id: "wildlife-4-adult-3", theme: "Wildlife", level: 4, ageGroup: "Adult", question: "Ecological niche?", options: ["Room", "Species' role in ecosystem", "Home", "Nest"], correctAnswer: 1 },
  { id: "wildlife-4-adult-4", theme: "Wildlife", level: 4, ageGroup: "Adult", question: "Population bottleneck?", options: ["Bottle", "Drastic size reduction", "Glass", "Plastic"], correctAnswer: 1 },
  { id: "wildlife-4-adult-5", theme: "Wildlife", level: 4, ageGroup: "Adult", question: "Conservation genetics?", options: ["Money", "Using DNA to save species", "Labs", "Gardens"], correctAnswer: 1 },

  // Level 5 - Kid
  { id: "wildlife-5-kid-1", theme: "Wildlife", level: 5, ageGroup: "Kid", question: "Loving animals means?", options: ["Respecting them", "Catching them", "Scaring them", "Ignoring"], correctAnswer: 0 },
  { id: "wildlife-5-kid-2", theme: "Wildlife", level: 5, ageGroup: "Kid", question: "Nature Hero?", options: ["Protects wildlife", "Litterer", "Lazy", "Loud"], correctAnswer: 0 },
  { id: "wildlife-5-kid-3", theme: "Wildlife", level: 5, ageGroup: "Kid", question: "Sharing Earth?", options: ["With all life", "Only people", "TV", "Cars"], correctAnswer: 0 },
  { id: "wildlife-5-kid-4", theme: "Wildlife", level: 5, ageGroup: "Kid", question: "Watching birds?", options: ["Peaceful", "Loud", "Scary", "Bad"], correctAnswer: 0 },
  { id: "wildlife-5-kid-5", theme: "Wildlife", level: 5, ageGroup: "Kid", question: "Future forests?", options: ["Full of life", "Empty", "Hard", "No"], correctAnswer: 0 },
  // Level 5 - Teen
  { id: "wildlife-5-teen-1", theme: "Wildlife", level: 5, ageGroup: "Teen", question: "Anthropocene?", options: ["Ancient", "Age of human impact", "Future", "Ice Age"], correctAnswer: 1 },
  { id: "wildlife-5-teen-2", theme: "Wildlife", level: 5, ageGroup: "Teen", question: "Resilience in ecosystems?", options: ["Weakness", "Ability to recover", "Fast", "Slow"], correctAnswer: 1 },
  { id: "wildlife-5-teen-3", theme: "Wildlife", level: 5, ageGroup: "Teen", question: "Ecological debt?", options: ["Money", "Overusing resources", "Sales", "Taxes"], correctAnswer: 1 },
  { id: "wildlife-5-teen-4", theme: "Wildlife", level: 5, ageGroup: "Teen", question: "Citizen science?", options: ["Pro only", "Public helping research", "School", "Lab"], correctAnswer: 1 },
  { id: "wildlife-5-teen-5", theme: "Wildlife", level: 5, ageGroup: "Teen", question: "Wildlife trade impact?", options: ["Good", "Species loss/disease", "None", "Better"], correctAnswer: 1 },
  // Level 5 - Adult
  { id: "wildlife-5-adult-1", theme: "Wildlife", level: 5, ageGroup: "Adult", question: "Megafauna extinction?", options: ["Small", "Large animal loss", "Plants", "Birds"], correctAnswer: 1 },
  { id: "wildlife-5-adult-2", theme: "Wildlife", level: 5, ageGroup: "Adult", question: "Ecosystem restoration?", options: ["Breaking", "Reversing degradation", "Mining", "Farming"], correctAnswer: 1 },
  { id: "wildlife-5-adult-3", theme: "Wildlife", level: 5, ageGroup: "Adult", question: "Natural capital?", options: ["Money", "Nature's stock of assets", "Sales", "Ads"], correctAnswer: 1 },
  { id: "wildlife-5-adult-4", theme: "Wildlife", level: 5, ageGroup: "Adult", question: "Conservation easements?", options: ["Roads", "Legal land protection", "Fences", "Walls"], correctAnswer: 1 },
  { id: "wildlife-5-adult-5", theme: "Wildlife", level: 5, ageGroup: "Adult", question: "Holocene vs Anthropocene?", options: ["Same", "Current vs Human age", "Old vs New", "Hot vs Cold"], correctAnswer: 1 },

  // --- POLLUTION ---
  // Level 1 - Kid
  { id: "pollution-1-kid-1", theme: "Pollution", level: 1, ageGroup: "Kid", question: "Recycle bin color often?", options: ["Black", "Blue/Green", "Red", "Grey"], correctAnswer: 1 },
  { id: "pollution-1-kid-2", theme: "Pollution", level: 1, ageGroup: "Kid", question: "Beach trash?", options: ["Leave it", "Bin it", "Sea", "Sand"], correctAnswer: 1 },
  { id: "pollution-1-kid-3", theme: "Pollution", level: 1, ageGroup: "Kid", question: "Factory smoke?", options: ["Pretty", "Dirty air", "Good smell", "Doesn't matter"], correctAnswer: 1 },
  { id: "pollution-1-kid-4", theme: "Pollution", level: 1, ageGroup: "Kid", question: "Old glass?", options: ["Trash", "Recycle", "Eat", "Hide"], correctAnswer: 1 },
  { id: "pollution-1-kid-5", theme: "Pollution", level: 1, ageGroup: "Kid", question: "Eco bottle?", options: ["Plastic", "Reusable", "Paper", "Straw"], correctAnswer: 1 },
  // Level 1 - Teen
  { id: "pollution-1-teen-1", theme: "Pollution", level: 1, ageGroup: "Teen", question: "Plastic bottle decomposition?", options: ["10 yrs", "50 yrs", "450 yrs", "1000 yrs"], correctAnswer: 2 },
  { id: "pollution-1-teen-2", theme: "Pollution", level: 1, ageGroup: "Teen", question: "Microplastics?", options: ["Robots", "Small pieces < 5mm", "Computer parts", "Bags"], correctAnswer: 1 },
  { id: "pollution-1-teen-3", theme: "Pollution", level: 1, ageGroup: "Teen", question: "E-waste?", options: ["Electronics", "Energy", "Eating", "Earth"], correctAnswer: 0 },
  { id: "pollution-1-teen-4", theme: "Pollution", level: 1, ageGroup: "Teen", question: "Ocean pollutant #1?", options: ["Bags", "Cigarette butts", "Glass", "Straws"], correctAnswer: 1 },
  { id: "pollution-1-teen-5", theme: "Pollution", level: 1, ageGroup: "Teen", question: "Recycling percentage?", options: ["9%", "50%", "75%", "100%"], correctAnswer: 0 },
  // Level 1 - Adult
  { id: "pollution-1-adult-1", theme: "Pollution", level: 1, ageGroup: "Adult", question: "Great Pacific Garbage Patch size?", options: ["Mall", "Texas x2", "Room", "Park"], correctAnswer: 1 },
  { id: "pollution-1-adult-2", theme: "Pollution", level: 1, ageGroup: "Adult", question: "BPA in plastics?", options: ["Bad", "Bisphenol A", "Big", "Best"], correctAnswer: 1 },
  { id: "pollution-1-adult-3", theme: "Pollution", level: 1, ageGroup: "Adult", question: "Air Quality Index (AQI)?", options: ["Colors", "Pollution measurement", "Maps", "Weather"], correctAnswer: 1 },
  { id: "pollution-1-adult-4", theme: "Pollution", level: 1, ageGroup: "Adult", question: "Point source pollution?", options: ["Many", "Single identifiable source", "Cloud", "Rain"], correctAnswer: 1 },
  { id: "pollution-1-adult-5", theme: "Pollution", level: 1, ageGroup: "Adult", question: "Landfill gases?", options: ["Oxygen", "Methane/CO2", "Nitrogen", "Argon"], correctAnswer: 1 },

  // Level 2 - Kid
  { id: "pollution-2-kid-1", theme: "Pollution", level: 2, ageGroup: "Kid", question: "Is littering okay?", options: ["Never", "Always", "Sometimes", "In parks"], correctAnswer: 0 },
  { id: "pollution-2-kid-2", theme: "Pollution", level: 2, ageGroup: "Kid", question: "Ocean animals eat trash?", options: ["Yes, sadly", "No", "Only sharks", "Maybe"], correctAnswer: 0 },
  { id: "pollution-2-kid-3", theme: "Pollution", level: 2, ageGroup: "Kid", question: "What is 'reuse'?", options: ["Trash", "Use again", "Break", "Sell"], correctAnswer: 1 },
  { id: "pollution-2-kid-4", theme: "Pollution", level: 2, ageGroup: "Kid", question: "Noisy cars cause?", options: ["Rain", "Noise pollution", "Sun", "Snow"], correctAnswer: 1 },
  { id: "pollution-2-kid-5", theme: "Pollution", level: 2, ageGroup: "Kid", question: "Dirty water looks?", options: ["Cloudy/Dark", "Clear", "Sparkly", "Pink"], correctAnswer: 0 },
  // Level 2 - Teen
  { id: "pollution-2-teen-1", theme: "Pollution", level: 2, ageGroup: "Teen", question: "Acid rain cause?", options: ["Sun", "Sulfur/Nitrogen oxides", "Ice", "Trees"], correctAnswer: 1 },
  { id: "pollution-2-teen-2", theme: "Pollution", level: 2, ageGroup: "Teen", question: "Biodegradable?", options: ["Lasts forever", "Breaks down naturally", "Plastic", "Metal"], correctAnswer: 1 },
  { id: "pollution-2-teen-3", theme: "Pollution", level: 2, ageGroup: "Teen", question: "Smog is?", options: ["Cloud", "Smoke + Fog", "Rain", "Wind"], correctAnswer: 1 },
  { id: "pollution-2-teen-4", theme: "Pollution", level: 2, ageGroup: "Teen", question: "Textile waste?", options: ["Food", "Old clothes", "Glass", "Oil"], correctAnswer: 1 },
  { id: "pollution-2-teen-5", theme: "Pollution", level: 2, ageGroup: "Teen", question: "Particulate matter (PM2.5)?", options: ["Big rocks", "Tiny airborne particles", "Water", "Fish"], correctAnswer: 1 },
  // Level 2 - Adult
  { id: "pollution-2-adult-1", theme: "Pollution", level: 2, ageGroup: "Adult", question: "Eutrophication cause?", options: ["Sound", "Nutrient runoff", "Heat", "Light"], correctAnswer: 1 },
  { id: "pollution-2-adult-2", theme: "Pollution", level: 2, ageGroup: "Adult", question: "Biomagnification?", options: ["Growing", "Toxin buildup in chain", "Magnets", "Lens"], correctAnswer: 1 },
  { id: "pollution-2-adult-3", theme: "Pollution", level: 2, ageGroup: "Adult", question: "Particulate matter origin?", options: ["Flowers", "Combustion/Dust", "Rain", "Ice"], correctAnswer: 1 },
  { id: "pollution-2-adult-4", theme: "Pollution", level: 2, ageGroup: "Adult", question: "Volatile Organic Compounds (VOCs)?", options: ["Water", "Chemical gases", "Rocks", "Soil"], correctAnswer: 1 },
  { id: "pollution-2-adult-5", theme: "Pollution", level: 2, ageGroup: "Adult", question: "Hazardous waste?", options: ["Apple", "Batteries/Chemicals", "Paper", "Bread"], correctAnswer: 1 },

  // Level 3 - Kid
  { id: "pollution-3-kid-1", theme: "Pollution", level: 3, ageGroup: "Kid", question: "Where does plastic go?", options: ["Disappears", "Lasts hundreds of years", "Becomes food", "Turns to water"], correctAnswer: 1 },
  { id: "pollution-3-kid-2", theme: "Pollution", level: 3, ageGroup: "Kid", question: "Composting is?", options: ["Burying plastic", "Turning food into soil", "Burning paper", "Mining"], correctAnswer: 1 },
  { id: "pollution-3-kid-3", theme: "Pollution", level: 3, ageGroup: "Kid", question: "Straws hurt?", options: ["Turtles", "Trees", "Mountains", "Sun"], correctAnswer: 0 },
  { id: "pollution-3-kid-4", theme: "Pollution", level: 3, ageGroup: "Kid", question: "Saving paper?", options: ["Saves trees", "Saves cars", "Saves ice", "Nothing"], correctAnswer: 0 },
  { id: "pollution-3-kid-5", theme: "Pollution", level: 3, ageGroup: "Kid", question: "Less trash means?", options: ["Happy Earth", "Sad Earth", "No change", "Hot Earth"], correctAnswer: 0 },
  // Level 3 - Teen
  { id: "pollution-3-teen-1", theme: "Pollution", level: 3, ageGroup: "Teen", question: "Single-use plastic ban?", options: ["Why not", "To reduce ocean waste", "To sell more", "None"], correctAnswer: 1 },
  { id: "pollution-3-teen-2", theme: "Pollution", level: 3, ageGroup: "Teen", question: "Ghost nets?", options: ["Spooky", "Abandoned fishing gear", "Clouds", "Ice"], correctAnswer: 1 },
  { id: "pollution-3-teen-3", theme: "Pollution", level: 3, ageGroup: "Teen", question: "Carbon monoxide?", options: ["Tasty", "Toxic gas", "Smells like roses", "Oxygen"], correctAnswer: 1 },
  { id: "pollution-3-teen-4", theme: "Pollution", level: 3, ageGroup: "Teen", question: "Sustainable fashion?", options: ["Cheap", "Eco-conscious clothing", "Fast", "Shiny"], correctAnswer: 1 },
  { id: "pollution-3-teen-5", theme: "Pollution", level: 3, ageGroup: "Teen", question: "Upcycling?", options: ["Cycling up hill", "Creative reuse", "Trash", "Breaking"], correctAnswer: 1 },
  // Level 3 - Adult
  { id: "pollution-3-adult-1", theme: "Pollution", level: 3, ageGroup: "Adult", question: "Persistent Organic Pollutants (POPs)?", options: ["Fast", "Long-lasting toxic chemicals", "Food", "Water"], correctAnswer: 1 },
  { id: "pollution-3-adult-2", theme: "Pollution", level: 3, ageGroup: "Adult", question: "Thermal pollution?", options: ["Cold", "Heated water discharge", "Sun", "Ice"], correctAnswer: 1 },
  { id: "pollution-3-adult-3", theme: "Pollution", level: 3, ageGroup: "Adult", question: "Extended Producer Responsibility (EPR)?", options: ["Buying", "Makers handle waste", "Selling", "Ads"], correctAnswer: 1 },
  { id: "pollution-3-adult-4", theme: "Pollution", level: 3, ageGroup: "Adult", question: "Circular economy?", options: ["Round", "Waste-free cycle", "Line", "Box"], correctAnswer: 1 },
  { id: "pollution-3-adult-5", theme: "Pollution", level: 3, ageGroup: "Adult", question: "Green chemistry?", options: ["Green dye", "Sustainable chemical design", "Plants", "Lab"], correctAnswer: 1 },

  // Level 4 - Kid
  { id: "pollution-4-kid-1", theme: "Pollution", level: 4, ageGroup: "Kid", question: "Too much smoke?", options: ["Hard to breathe", "Good", "Funny", "Blue sky"], correctAnswer: 0 },
  { id: "pollution-4-kid-2", theme: "Pollution", level: 4, ageGroup: "Kid", question: "Battery in trash?", options: ["Yes", "No, special bin", "Under bed", "Park"], correctAnswer: 1 },
  { id: "pollution-4-kid-3", theme: "Pollution", level: 4, ageGroup: "Kid", question: "Plastic bag vs Cloth?", options: ["Plastic wins", "Cloth is better", "Same", "Paper"], correctAnswer: 1 },
  { id: "pollution-4-kid-4", theme: "Pollution", level: 4, ageGroup: "Kid", question: "Donating toys?", options: ["Less waste", "Bad", "Mean", "Loud"], correctAnswer: 0 },
  { id: "pollution-4-kid-5", theme: "Pollution", level: 4, ageGroup: "Kid", question: "Eco-Hero?", options: ["Cleans trash", "Litterer", "Lazy", "Noisy"], correctAnswer: 0 },
  // Level 4 - Teen
  { id: "pollution-4-teen-1", theme: "Pollution", level: 4, ageGroup: "Teen", question: "Phthalates?", options: ["Food", "Plastic softeners", "Water", "Air"], correctAnswer: 1 },
  { id: "pollution-4-teen-2", theme: "Pollution", level: 4, ageGroup: "Teen", question: "Secondary pollutants?", options: ["Direct", "Formed in air", "Soil", "Rocks"], correctAnswer: 1 },
  { id: "pollution-4-teen-3", theme: "Pollution", level: 4, ageGroup: "Teen", question: "Ocean deoxygenation?", options: ["More air", "Loss of O2", "Salt", "Ice"], correctAnswer: 1 },
  { id: "pollution-4-teen-4", theme: "Pollution", level: 4, ageGroup: "Teen", question: "Microbeads?", options: ["Beads", "Tiny plastic in soaps", "Food", "Water"], correctAnswer: 1 },
  { id: "pollution-4-teen-5", theme: "Pollution", level: 4, ageGroup: "Teen", question: "Noise pollution effect?", options: ["Hearing loss/stress", "Better sleep", "Rain", "Sun"], correctAnswer: 0 },
  // Level 4 - Adult
  { id: "pollution-4-adult-1", theme: "Pollution", level: 4, ageGroup: "Adult", question: "Bioaccumulation vs Biomagnification?", options: ["Same", "Individual vs Chain", "Water vs Air", "Hot vs Cold"], correctAnswer: 1 },
  { id: "pollution-4-adult-2", theme: "Pollution", level: 4, ageGroup: "Adult", question: "Leachate?", options: ["Tea", "Contaminated landfill liquid", "Oil", "Water"], correctAnswer: 1 },
  { id: "pollution-4-adult-3", theme: "Pollution", level: 4, ageGroup: "Adult", question: "Criteria air pollutants?", options: ["EPA regulated list", "Maps", "Weather", "Sun"], correctAnswer: 0 },
  { id: "pollution-4-adult-4", theme: "Pollution", level: 4, ageGroup: "Adult", question: "Endocrine disruptors?", options: ["Hormone-altering chems", "Energy", "Light", "Noise"], correctAnswer: 0 },
  { id: "pollution-4-adult-5", theme: "Pollution", level: 4, ageGroup: "Adult", question: "Environmental remediation?", options: ["Cleaning pollution sites", "Buying land", "Farming", "Mining"], correctAnswer: 0 },

  // Level 5 - Kid
  { id: "pollution-5-kid-1", theme: "Pollution", level: 5, ageGroup: "Kid", question: "Picking up trash?", options: ["Helpful", "Mean", "Dirty", "Slow"], correctAnswer: 0 },
  { id: "pollution-5-kid-2", theme: "Pollution", level: 5, ageGroup: "Kid", question: "Zero waste?", options: ["No trash", "All trash", "Some", "Lots"], correctAnswer: 0 },
  { id: "pollution-5-kid-3", theme: "Pollution", level: 5, ageGroup: "Kid", question: "Sharing helps?", options: ["Yes, fewer things", "No", "Maybe", "Later"], correctAnswer: 0 },
  { id: "pollution-5-kid-4", theme: "Pollution", level: 5, ageGroup: "Kid", question: "Earth's friend?", options: ["Litterer", "EcoWarrior", "TV", "Car"], correctAnswer: 1 },
  { id: "pollution-5-kid-5", theme: "Pollution", level: 5, ageGroup: "Kid", question: "Future world?", options: ["Clean", "Dirty", "Hard", "No"], correctAnswer: 0 },
  // Level 5 - Teen
  { id: "pollution-5-teen-1", theme: "Pollution", level: 5, ageGroup: "Teen", question: "PFAS 'forever chemicals'?", options: ["Short", "Persistent toxins", "Food", "Air"], correctAnswer: 1 },
  { id: "pollution-5-teen-2", theme: "Pollution", level: 5, ageGroup: "Teen", question: "Urban heat island?", options: ["Tropical", "Cities hotter than rural", "Beach", "Park"], correctAnswer: 1 },
  { id: "pollution-5-teen-3", theme: "Pollution", level: 5, ageGroup: "Teen", question: "Polluter pays principle?", options: ["Free", "Makers pay for damage", "Buying", "Selling"], correctAnswer: 1 },
  { id: "pollution-5-teen-4", theme: "Pollution", level: 5, ageGroup: "Teen", question: "Ecological footprint?", options: ["Shoe size", "Resource consumption metric", "Step", "Dirt"], correctAnswer: 1 },
  { id: "pollution-5-teen-5", theme: "Pollution", level: 5, ageGroup: "Teen", question: "Regenerative design?", options: ["Old", "Nature-restoring systems", "Wasteful", "Broken"], correctAnswer: 1 },
  // Level 5 - Adult
  { id: "pollution-5-adult-1", theme: "Pollution", level: 5, ageGroup: "Adult", question: "E-waste mining?", options: ["Digging", "Recovering metals from tech", "Coal", "Gold"], correctAnswer: 1 },
  { id: "pollution-5-adult-2", theme: "Pollution", level: 5, ageGroup: "Adult", question: "NIMBYism?", options: ["Dancing", "Not In My Backyard", "Sleeping", "Eating"], correctAnswer: 1 },
  { id: "pollution-5-adult-3", theme: "Pollution", level: 5, ageGroup: "Adult", question: "Life Cycle Assessment (LCA)?", options: ["Health", "Product env impact analysis", "Money", "Sales"], correctAnswer: 1 },
  { id: "pollution-5-adult-4", theme: "Pollution", level: 5, ageGroup: "Adult", question: "Nanoplastics?", options: ["Big", "Ultra-small plastic < 100nm", "Lego", "Bags"], correctAnswer: 1 },
  { id: "pollution-5-adult-5", theme: "Pollution", level: 5, ageGroup: "Adult", question: "Bioremediation?", options: ["Plants/Microbes cleaning pollution", "Mining", "Farming", "Zoos"], correctAnswer: 0 },

  // --- WATER ---
  // Level 1 - Kid
  { id: "water-1-kid-1", theme: "Water", level: 1, ageGroup: "Kid", question: "Brushing teeth?", options: ["Tap on", "Tap off", "Sing", "Dance"], correctAnswer: 1 },
  { id: "water-1-kid-2", theme: "Water", level: 1, ageGroup: "Kid", question: "Who needs water?", options: ["People", "Plants", "Everything alive", "Fish"], correctAnswer: 2 },
  { id: "water-1-kid-3", theme: "Water", level: 1, ageGroup: "Kid", question: "Rain source?", options: ["Ground", "Clouds", "Moon", "Sun"], correctAnswer: 1 },
  { id: "water-1-kid-4", theme: "Water", level: 1, ageGroup: "Kid", question: "Earth is mostly?", options: ["Water", "Land", "Equal", "Air"], correctAnswer: 0 },
  { id: "water-1-kid-5", theme: "Water", level: 1, ageGroup: "Kid", question: "A drop is?", options: ["Wave", "Tiny bit", "Fish", "Cloud"], correctAnswer: 1 },
  // Level 1 - Teen
  { id: "water-1-teen-1", theme: "Water", level: 1, ageGroup: "Teen", question: "Freshwater percentage?", options: ["1%", "3%", "10%", "25%"], correctAnswer: 1 },
  { id: "water-1-teen-2", theme: "Water", level: 1, ageGroup: "Teen", question: "Water cycle?", options: ["Bike", "Constant water movement", "Storm", "River"], correctAnswer: 1 },
  { id: "water-1-teen-3", theme: "Water", level: 1, ageGroup: "Teen", question: "Aquifer?", options: ["Fish", "Underground water layer", "Cloud", "Tap"], correctAnswer: 1 },
  { id: "water-1-teen-4", theme: "Water", level: 1, ageGroup: "Teen", question: "Virtual water?", options: ["Video game", "Water used to make products", "Ghost", "Air"], correctAnswer: 1 },
  { id: "water-1-teen-5", theme: "Water", level: 1, ageGroup: "Teen", question: "Wetlands purpose?", options: ["None", "Flood control/Filtration", "Swimming", "Mining"], correctAnswer: 1 },
  // Level 1 - Adult
  { id: "water-1-adult-1", theme: "Water", level: 1, ageGroup: "Adult", question: "Desalination leader?", options: ["USA", "Saudi Arabia", "China", "Russia"], correctAnswer: 1 },
  { id: "water-1-adult-2", theme: "Water", level: 1, ageGroup: "Adult", question: "Greywater vs Blackwater?", options: ["Same", "Sink/Shower vs Toilet", "Hot vs Cold", "Salt vs Fresh"], correctAnswer: 1 },
  { id: "water-1-adult-3", theme: "Water", level: 1, ageGroup: "Adult", question: "Watershed?", options: ["Shed", "Area draining to one point", "Tank", "Dam"], correctAnswer: 1 },
  { id: "water-1-adult-4", theme: "Water", level: 1, ageGroup: "Adult", question: "Potable means?", options: ["Dirty", "Safe to drink", "Magic", "Hot"], correctAnswer: 1 },
  { id: "water-1-adult-5", theme: "Water", level: 1, ageGroup: "Adult", question: "Water stress?", options: ["Tired", "High demand/low supply", "Wet", "Rain"], correctAnswer: 1 },

  // Level 2 - Kid
  { id: "water-2-kid-1", theme: "Water", level: 2, ageGroup: "Kid", question: "Saltwater in?", options: ["Taps", "Oceans", "Milk", "Juice"], correctAnswer: 1 },
  { id: "water-2-kid-2", theme: "Water", level: 2, ageGroup: "Kid", question: "Fish breathe in?", options: ["Air", "Water", "Rocks", "Sand"], correctAnswer: 1 },
  { id: "water-2-kid-3", theme: "Water", level: 2, ageGroup: "Kid", question: "Save water by?", options: ["Leak fix", "Long bath", "Waste", "None"], correctAnswer: 0 },
  { id: "water-2-kid-4", theme: "Water", level: 2, ageGroup: "Kid", question: "Rainwater?", options: ["Good for plants", "Bad", "Tasty", "Blue"], correctAnswer: 0 },
  { id: "water-2-kid-5", theme: "Water", level: 2, ageGroup: "Kid", question: "Frozen water is?", options: ["Juice", "Ice", "Steam", "Gas"], correctAnswer: 1 },
  // Level 2 - Teen
  { id: "water-2-teen-1", theme: "Water", level: 2, ageGroup: "Teen", question: "Transpiration?", options: ["Cars", "Plants releasing water vapor", "Wind", "Waves"], correctAnswer: 1 },
  { id: "water-2-teen-2", theme: "Water", level: 2, ageGroup: "Teen", question: "Surface runoff?", options: ["Running", "Water flowing over land", "Sky", "Tap"], correctAnswer: 1 },
  { id: "water-2-teen-3", theme: "Water", level: 2, ageGroup: "Teen", question: "Hard water contains?", options: ["Ice", "Minerals like Calcium", "Sugar", "Oil"], correctAnswer: 1 },
  { id: "water-2-teen-4", theme: "Water", level: 2, ageGroup: "Teen", question: "Water footprint?", options: ["Step", "Total water use metric", "Shoe", "Wet"], correctAnswer: 1 },
  { id: "water-2-teen-5", theme: "Water", level: 2, ageGroup: "Teen", question: "Glaciers contain?", options: ["Salt", "Freshwater", "Milk", "Sand"], correctAnswer: 1 },
  // Level 2 - Adult
  { id: "water-2-adult-1", theme: "Water", level: 2, ageGroup: "Adult", question: "Hydrological cycle driver?", options: ["Moon", "Sun", "Wind", "Earth rotation"], correctAnswer: 1 },
  { id: "water-2-adult-2", theme: "Water", level: 2, ageGroup: "Adult", question: "Riparian zone?", options: ["Space", "Area near river/stream", "Mountain", "Desert"], correctAnswer: 1 },
  { id: "water-2-adult-3", theme: "Water", level: 2, ageGroup: "Adult", question: "Xeriscaping?", options: ["Farming", "Water-efficient landscaping", "Milling", "Zoos"], correctAnswer: 1 },
  { id: "water-2-adult-4", theme: "Water", level: 2, ageGroup: "Adult", question: "Subsidence?", options: ["Growing", "Ground sinking from water loss", "Waves", "Tides"], correctAnswer: 1 },
  { id: "water-2-adult-5", theme: "Water", level: 2, ageGroup: "Adult", question: "Eutrophic lake?", options: ["Deep", "Nutrient-rich/Low oxygen", "Clear", "Frozen"], correctAnswer: 1 },

  // Level 3 - Kid
  { id: "water-3-kid-1", theme: "Water", level: 3, ageGroup: "Kid", question: "Tap water from?", options: ["Bottles", "Rivers/Lakes", "The moon", "Milk"], correctAnswer: 1 },
  { id: "water-3-kid-2", theme: "Water", level: 3, ageGroup: "Kid", question: "Short showers?", options: ["Save water", "Bad", "Loud", "Fast"], correctAnswer: 0 },
  { id: "water-3-kid-3", theme: "Water", level: 3, ageGroup: "Kid", question: "Drought means?", options: ["No rain", "Lots rain", "Floods", "Snow"], correctAnswer: 0 },
  { id: "water-3-kid-4", theme: "Water", level: 3, ageGroup: "Kid", question: "Water's taste?", options: ["Nothing", "Sweet", "Sour", "Salt"], correctAnswer: 0 },
  { id: "water-3-kid-5", theme: "Water", level: 3, ageGroup: "Kid", question: "Bubbles in water?", options: ["Air", "Rocks", "Sand", "Food"], correctAnswer: 0 },
  // Level 3 - Teen
  { id: "water-3-teen-1", theme: "Water", level: 3, ageGroup: "Teen", question: "Water scarcity?", options: ["Lots", "Lack of enough water", "Salt", "Ice"], correctAnswer: 1 },
  { id: "water-3-teen-2", theme: "Water", level: 3, ageGroup: "Teen", question: "Drip irrigation?", options: ["Waste", "Efficient watering", "Flooding", "None"], correctAnswer: 1 },
  { id: "water-3-teen-3", theme: "Water", level: 3, ageGroup: "Teen", question: "Turbidity?", options: ["Clear", "Cloudiness of water", "Heat", "Salt"], correctAnswer: 1 },
  { id: "water-3-teen-4", theme: "Water", level: 3, ageGroup: "Teen", question: "Sewage treatment?", options: ["None", "Cleaning blackwater", "Swimming", "Mining"], correctAnswer: 1 },
  { id: "water-3-teen-5", theme: "Water", level: 3, ageGroup: "Teen", question: "H2O is?", options: ["Juice", "Water chemical name", "Air", "Milk"], correctAnswer: 1 },
  // Level 3 - Adult
  { id: "water-3-adult-1", theme: "Water", level: 3, ageGroup: "Adult", question: "Water sovereignty?", options: ["Control over water access", "Money", "Taxes", "Buying"], correctAnswer: 0 },
  { id: "water-3-adult-2", theme: "Water", level: 3, ageGroup: "Adult", question: "Salinization?", options: ["Adding sugar", "Salt buildup in soil", "Watering", "Cleaning"], correctAnswer: 1 },
  { id: "water-3-adult-3", theme: "Water", level: 3, ageGroup: "Adult", question: "Blue vs Green water?", options: ["Surface vs Soil moisture", "Salt vs Fresh", "Hot vs Cold", "Deep vs Shallow"], correctAnswer: 0 },
  { id: "water-3-adult-4", theme: "Water", level: 3, ageGroup: "Adult", question: "Hydroelectricity pros?", options: ["No CO2", "Cheap", "Reliable", "All above"], correctAnswer: 3 },
  { id: "water-3-adult-5", theme: "Water", level: 3, ageGroup: "Adult", question: "SDG 6 focus?", options: ["Clean water/Sanitation", "Life", "Money", "Power"], correctAnswer: 0 },

  // Level 4 - Kid
  { id: "water-4-kid-1", theme: "Water", level: 4, ageGroup: "Kid", question: "Leaky toilet?", options: ["Wastes water", "Good", "Funny", "Blue"], correctAnswer: 0 },
  { id: "water-4-kid-2", theme: "Water", level: 4, ageGroup: "Kid", question: "Oceans cover?", options: ["70% of Earth", "10%", "50%", "100%"], correctAnswer: 0 },
  { id: "water-4-kid-3", theme: "Water", level: 4, ageGroup: "Kid", question: "Water steam is?", options: ["Solid", "Gas", "Liquid", "Ice"], correctAnswer: 1 },
  { id: "water-4-kid-4", theme: "Water", level: 4, ageGroup: "Kid", question: "Wash car with?", options: ["Bucket", "Running hose", "Milk", "Juice"], correctAnswer: 0 },
  { id: "water-4-kid-5", theme: "Water", level: 4, ageGroup: "Kid", question: "Eco-Fish?", options: ["Tox-free", "Plastic", "Dirty", "Sad"], correctAnswer: 0 },
  // Level 4 - Teen
  { id: "water-4-teen-1", theme: "Water", level: 4, ageGroup: "Teen", question: "Dead zones?", options: ["Zombies", "Hypoxic water (low O2)", "Ice", "Salt"], correctAnswer: 1 },
  { id: "water-4-teen-2", theme: "Water", level: 4, ageGroup: "Teen", question: "Micro-hydro?", options: ["Big", "Small scale water power", "Rain", "Tap"], correctAnswer: 1 },
  { id: "water-4-teen-3", theme: "Water", level: 4, ageGroup: "Teen", question: "Reverse osmosis?", options: ["Cooking", "Water filtration method", "Magic", "Storm"], correctAnswer: 1 },
  { id: "water-4-teen-4", theme: "Water", level: 4, ageGroup: "Teen", question: "Thermal expansion?", options: ["Growing", "Water expanding as it warms", "Waves", "Tides"], correctAnswer: 1 },
  { id: "water-4-teen-5", theme: "Water", level: 4, ageGroup: "Teen", question: "Benthic zone?", options: ["Surface", "Bottom of water body", "Air", "Clouds"], correctAnswer: 1 },
  // Level 4 - Adult
  { id: "water-4-adult-1", theme: "Water", level: 4, ageGroup: "Adult", question: "Anoxic water?", options: ["High O2", "No dissolved O2", "Salt", "Acid"], correctAnswer: 1 },
  { id: "water-4-adult-2", theme: "Water", level: 4, ageGroup: "Adult", question: "Precipitable water?", options: ["Rain", "Water vapor in air column", "River", "Lake"], correctAnswer: 1 },
  { id: "water-4-adult-3", theme: "Water", level: 4, ageGroup: "Adult", question: "Point-of-use (POU) treatment?", options: ["Large plant", "Home-scale filtration", "Rain", "Dam"], correctAnswer: 1 },
  { id: "water-4-adult-4", theme: "Water", level: 4, ageGroup: "Adult", question: "Water-energy nexus?", options: ["Connections", "Interdependence of both", "War", "Sales"], correctAnswer: 1 },
  { id: "water-4-adult-5", theme: "Water", level: 4, ageGroup: "Adult", question: "Fossil water?", options: ["Dinos", "Ancient non-renewed water", "Steam", "Ice"], correctAnswer: 1 },

  // Level 5 - Kid
  { id: "water-5-kid-1", theme: "Water", level: 5, ageGroup: "Kid", question: "Saving one drop?", options: ["Helps", "Doesn't", "Funny", "No"], correctAnswer: 0 },
  { id: "water-5-kid-2", theme: "Water", level: 5, ageGroup: "Kid", question: "Water hero?", options: ["Saves water", "Wastes it", "Lazy", "Loud"], correctAnswer: 0 },
  { id: "water-5-kid-3", theme: "Water", level: 5, ageGroup: "Kid", question: "Ocean love?", options: ["Keep clean", "Dirty", "Litter", "Ignore"], correctAnswer: 0 },
  { id: "water-5-kid-4", theme: "Water", level: 5, ageGroup: "Kid", question: "Sharing water?", options: ["Good", "Bad", "Mean", "Loud"], correctAnswer: 0 },
  { id: "water-5-kid-5", theme: "Water", level: 5, ageGroup: "Kid", question: "Future lakes?", options: ["Blue/Clean", "Brown", "Empty", "Hard"], correctAnswer: 0 },
  // Level 5 - Teen
  { id: "water-5-teen-1", theme: "Water", level: 5, ageGroup: "Teen", question: "Integrated Water Resource Management?", options: ["Coordinated water handling", "Selling", "Buying", "None"], correctAnswer: 0 },
  { id: "water-5-teen-2", theme: "Water", level: 5, ageGroup: "Teen", question: "Virtual water trade?", options: ["Internet", "Food/Goods export-water", "Ghost", "Air"], correctAnswer: 1 },
  { id: "water-5-teen-3", theme: "Water", level: 5, ageGroup: "Teen", question: "Rainwater harvesting?", options: ["Collecting rain for use", "Wasting", "Mining", "None"], correctAnswer: 0 },
  { id: "water-5-teen-4", theme: "Water", level: 5, ageGroup: "Teen", question: "Cryosphere?", options: ["Crying", "Frozen water parts of Earth", "Air", "Ground"], correctAnswer: 1 },
  { id: "water-5-teen-5", theme: "Water", level: 5, ageGroup: "Teen", question: "Ocean acidification impact?", options: ["Shellfish loss", "Bigger fish", "More rain", "None"], correctAnswer: 0 },
  // Level 5 - Adult
  { id: "water-5-adult-1", theme: "Water", level: 5, ageGroup: "Adult", question: "Hydro-politics?", options: ["Water-based conflicts", "Boats", "Swimming", "Farms"], correctAnswer: 0 },
  { id: "water-5-adult-2", theme: "Water", level: 5, ageGroup: "Adult", question: "Smart water grids?", options: ["Digital monitored systems", "Nets", "Fences", "Walls"], correctAnswer: 0 },
  { id: "water-5-adult-3", theme: "Water", level: 5, ageGroup: "Adult", question: "Decentralized wastewater?", options: ["On-site treatment", "Big pipes", "Rivers", "Lakes"], correctAnswer: 0 },
  { id: "water-5-adult-4", theme: "Water", level: 5, ageGroup: "Adult", question: "Micro-irrigation?", options: ["Efficient watering", "Flooding", "None", "Mining"], correctAnswer: 0 },
  { id: "water-5-adult-5", theme: "Water", level: 5, ageGroup: "Adult", question: "Ecosystem services of water?", options: ["Value of natural water flow", "Money", "Bills", "Sales"], correctAnswer: 0 },

  // --- ENERGY ---
  // Level 1 - Kid
  { id: "energy-1-kid-1", theme: "Energy", level: 1, ageGroup: "Kid", question: "Sun power?", options: ["Solar panels", "Windmills", "Coal", "Batteries"], correctAnswer: 0 },
  { id: "energy-1-kid-2", theme: "Energy", level: 1, ageGroup: "Kid", question: "Uses electricity?", options: ["Book", "TV", "Bear", "Spoon"], correctAnswer: 1 },
  { id: "energy-1-kid-3", theme: "Energy", level: 1, ageGroup: "Kid", question: "Wind turbine needs?", options: ["Water", "Wind", "Sun", "Magnets"], correctAnswer: 1 },
  { id: "energy-1-kid-4", theme: "Energy", level: 1, ageGroup: "Kid", question: "Sleep with TV on?", options: ["Yes", "No", "Loud", "Maybe"], correctAnswer: 1 },
  { id: "energy-1-kid-5", theme: "Energy", level: 1, ageGroup: "Kid", question: "Battery purpose?", options: ["Storage", "Food", "Cleaning", "Art"], correctAnswer: 0 },
  // Level 1 - Teen
  { id: "energy-1-teen-1", theme: "Energy", level: 1, ageGroup: "Teen", question: "Fossil fuel example?", options: ["Wind", "Solar", "Coal", "Water"], correctAnswer: 2 },
  { id: "energy-1-teen-2", theme: "Energy", level: 1, ageGroup: "Teen", question: "Energy conservation?", options: ["Using more", "Saving energy", "Buying toys", "None"], correctAnswer: 1 },
  { id: "energy-1-teen-3", theme: "Energy", level: 1, ageGroup: "Teen", question: "LED benefits?", options: ["Hot", "Uses 75% less energy", "Cheap", "Loud"], correctAnswer: 1 },
  { id: "energy-1-teen-4", theme: "Energy", level: 1, ageGroup: "Teen", question: "Phantom load?", options: ["Ghosts", "Idle power usage", "Static", "Wind"], correctAnswer: 1 },
  { id: "energy-1-teen-5", theme: "Energy", level: 1, ageGroup: "Teen", question: "Smart power strip?", options: ["Flat", "Cuts idle power", "Loud", "Fast"], correctAnswer: 1 },
  // Level 1 - Adult
  { id: "energy-1-adult-1", theme: "Energy", level: 1, ageGroup: "Adult", question: "Global electricity from coal?", options: ["10%", "36%", "75%", "100%"], correctAnswer: 1 },
  { id: "energy-1-adult-2", theme: "Energy", level: 1, ageGroup: "Adult", question: "Energy intensity?", options: ["Power", "Energy per unit of GDP", "Heat", "Light"], correctAnswer: 1 },
  { id: "energy-1-adult-3", theme: "Energy", level: 1, ageGroup: "Adult", question: "Renewable energy share goal?", options: ["0%", "100% eventually", "50%", "10%"], correctAnswer: 1 },
  { id: "energy-1-adult-4", theme: "Energy", level: 1, ageGroup: "Adult", question: "Energy efficiency?", options: ["Using less for same task", "Using more", "Buying", "Selling"], correctAnswer: 0 },
  { id: "energy-1-adult-5", theme: "Energy", level: 1, ageGroup: "Adult", question: "Carbon capture?", options: ["Mining", "Trapping emissions at source", "Selling", "Buying"], correctAnswer: 1 },

  // Level 2 - Kid
  { id: "energy-2-kid-1", theme: "Energy", level: 2, ageGroup: "Kid", question: "Windmill look?", options: ["Giant fan", "Big box", "Small car", "House"], correctAnswer: 0 },
  { id: "energy-2-kid-2", theme: "Energy", level: 2, ageGroup: "Kid", question: "Fire wood from?", options: ["Rocks", "Trees", "Plastic", "Metal"], correctAnswer: 1 },
  { id: "energy-2-kid-3", theme: "Energy", level: 2, ageGroup: "Kid", question: "Phone charge all night?", options: ["Yes", "No, saves energy", "Maybe", "Sometimes"], correctAnswer: 1 },
  { id: "energy-2-kid-4", theme: "Energy", level: 2, ageGroup: "Kid", question: "Solar panel color?", options: ["Pink", "Dark blue/Black", "Yellow", "White"], correctAnswer: 1 },
  { id: "energy-2-kid-5", theme: "Energy", level: 2, ageGroup: "Kid", question: "Walk to school?", options: ["Saves gas", "Bad", "Loud", "Slow"], correctAnswer: 0 },
  // Level 2 - Teen
  { id: "energy-2-teen-1", theme: "Energy", level: 2, ageGroup: "Teen", question: "Geothermal energy?", options: ["Sun", "Heat from Earth", "Wind", "Water"], correctAnswer: 1 },
  { id: "energy-2-teen-2", theme: "Energy", level: 2, ageGroup: "Teen", question: "Vampire power?", options: ["Scary", "Phantom load", "Static", "None"], correctAnswer: 1 },
  { id: "energy-2-teen-3", theme: "Energy", level: 2, ageGroup: "Teen", question: "Passive solar design?", options: ["Nets", "Using sun for heat/light", "Fences", "Walls"], correctAnswer: 1 },
  { id: "energy-2-teen-4", theme: "Energy", level: 2, ageGroup: "Teen", question: "Energy audit?", options: ["Music", "Assessing home energy use", "Bill", "Ad"], correctAnswer: 1 },
  { id: "energy-2-teen-5", theme: "Energy", level: 2, ageGroup: "Teen", question: "Biofuel origin?", options: ["Rocks", "Organic matter", "Plastic", "Metal"], correctAnswer: 1 },
  // Level 2 - Adult
  { id: "energy-2-adult-1", theme: "Energy", level: 2, ageGroup: "Adult", question: "Levelized Cost of Energy (LCOE)?", options: ["Price", "Total cost per MWh", "Tax", "Fee"], correctAnswer: 1 },
  { id: "energy-2-adult-2", theme: "Energy", level: 2, ageGroup: "Adult", question: "Intermittency?", options: ["Constant", "Non-continuous supply", "Fast", "Slow"], correctAnswer: 1 },
  { id: "energy-2-adult-3", theme: "Energy", level: 2, ageGroup: "Adult", question: "Grid parity?", options: ["Match in cost", "Diff", "High", "Low"], correctAnswer: 0 },
  { id: "energy-2-adult-4", theme: "Energy", level: 2, ageGroup: "Adult", question: "Feed-in tariff?", options: ["Tax", "Payment for grid power", "Fee", "Fine"], correctAnswer: 1 },
  { id: "energy-2-adult-5", theme: "Energy", level: 2, ageGroup: "Adult", question: "Pumped-storage hydro?", options: ["None", "Storing energy as water", "Mining", "Farming"], correctAnswer: 1 },

  // Level 3 - Kid
  { id: "energy-3-kid-1", theme: "Energy", level: 3, ageGroup: "Kid", question: "Clean energy?", options: ["Sun/Wind", "Coal/Smoke", "Trash", "Dirt"], correctAnswer: 0 },
  { id: "energy-3-kid-2", theme: "Energy", level: 3, ageGroup: "Kid", question: "Wind speeds?", options: ["Turn turbines", "Stop trees", "Bad", "Loud"], correctAnswer: 0 },
  { id: "energy-3-kid-3", theme: "Energy", level: 3, ageGroup: "Kid", question: "Switching off?", options: ["Helps Earth", "Bad", "Mean", "Slow"], correctAnswer: 0 },
  { id: "energy-3-kid-4", theme: "Energy", level: 3, ageGroup: "Kid", question: "Bigger windows?", options: ["More light/heat", "Bad", "Loud", "Small"], correctAnswer: 0 },
  { id: "energy-3-kid-5", theme: "Energy", level: 3, ageGroup: "Kid", question: "Energy Hero?", options: ["Saves power", "Wastes it", "Lazy", "Loud"], correctAnswer: 0 },
  // Level 3 - Teen
  { id: "energy-3-teen-1", theme: "Energy", level: 3, ageGroup: "Teen", question: "Photovoltaic cells?", options: ["Plants", "Solar cells", "Wind", "Water"], correctAnswer: 1 },
  { id: "energy-3-teen-2", theme: "Energy", level: 3, ageGroup: "Teen", question: "Hydrogen fuel cells?", options: ["Gas", "Clean energy tech", "Batteries", "None"], correctAnswer: 1 },
  { id: "energy-3-teen-3", theme: "Energy", level: 3, ageGroup: "Teen", question: "Energy storage?", options: ["Boxes", "Batteries/Hydro", "Clouds", "Rain"], correctAnswer: 1 },
  { id: "energy-3-teen-4", theme: "Energy", level: 3, ageGroup: "Teen", question: "Decarbonization?", options: ["Adding C", "Removing carbon focus", "Selling", "Buying"], correctAnswer: 1 },
  { id: "energy-3-teen-5", theme: "Energy", level: 3, ageGroup: "Teen", question: "Smart meter?", options: ["Clock", "Digital energy tracker", "Scale", "Map"], correctAnswer: 1 },
  // Level 3 - Adult
  { id: "energy-3-adult-1", theme: "Energy", level: 3, ageGroup: "Adult", question: "Base load power?", options: ["Variable", "Constant min supply", "Peak", "None"], correctAnswer: 1 },
  { id: "energy-3-adult-2", theme: "Energy", level: 3, ageGroup: "Adult", question: "Energy density of fuels?", options: ["Weight", "Energy per unit volume", "Heat", "Light"], correctAnswer: 1 },
  { id: "energy-3-adult-3", theme: "Energy", level: 3, ageGroup: "Adult", question: "Green hydrogen?", options: ["Green dye", "Electrolysis from renewables", "Gas", "Coal"], correctAnswer: 1 },
  { id: "energy-3-adult-4", theme: "Energy", level: 3, ageGroup: "Adult", question: "Capacity factor?", options: ["Size", "Actual vs Potential output", "Weight", "Speed"], correctAnswer: 1 },
  { id: "energy-3-adult-5", theme: "Energy", level: 3, ageGroup: "Adult", question: "Distributed generation?", options: ["Large plant", "Local small sources", "Grid", "None"], correctAnswer: 1 },

  // Level 4 - Kid
  { id: "energy-4-kid-1", theme: "Energy", level: 4, ageGroup: "Kid", question: "Hot water needs?", options: ["Energy", "Nothing", "Cold", "Ice"], correctAnswer: 0 },
  { id: "energy-4-kid-2", theme: "Energy", level: 4, ageGroup: "Kid", question: "Wind farms are?", options: ["Animals", "Groups of turbines", "Gardens", "Parks"], correctAnswer: 1 },
  { id: "energy-4-kid-3", theme: "Energy", level: 4, ageGroup: "Kid", question: "Sun shines?", options: ["Daytime power", "Night", "Rain", "Snow"], correctAnswer: 0 },
  { id: "energy-4-kid-4", theme: "Energy", level: 4, ageGroup: "Kid", question: "Ride bus?", options: ["Saves energy", "Bad", "Loud", "Mean"], correctAnswer: 0 },
  { id: "energy-4-kid-5", theme: "Energy", level: 4, ageGroup: "Kid", question: "Eco-House?", options: ["Uses less power", "Wasteful", "Dark", "Loud"], correctAnswer: 0 },
  // Level 4 - Teen
  { id: "energy-4-teen-1", theme: "Energy", level: 4, ageGroup: "Teen", question: "Nuclear fission?", options: ["Fusion", "Splitting atoms for power", "Burning", "Mixing"], correctAnswer: 1 },
  { id: "energy-4-teen-2", theme: "Energy", level: 4, ageGroup: "Teen", question: "Microgrids?", options: ["Big", "Self-sufficient small grids", "Nets", "Fences"], correctAnswer: 1 },
  { id: "energy-4-teen-3", theme: "Energy", level: 4, ageGroup: "Teen", question: "Energy return on investment (EROI)?", options: ["Money", "Energy gain vs energy used", "Tax", "Fee"], correctAnswer: 1 },
  { id: "energy-4-teen-4", theme: "Energy", level: 4, ageGroup: "Teen", question: "Solid-state batteries?", options: ["Liquid", "New safer battery tech", "Old", "None"], correctAnswer: 1 },
  { id: "energy-4-teen-5", theme: "Energy", level: 4, ageGroup: "Teen", question: "Ocean thermal energy?", options: ["Wind", "Heat diff between sea layers", "Waves", "Tides"], correctAnswer: 1 },
  // Level 4 - Adult
  { id: "energy-4-adult-1", theme: "Energy", level: 4, ageGroup: "Adult", question: "Curtailment?", options: ["Adding", "Reducing output to balance grid", "Mining", "Selling"], correctAnswer: 1 },
  { id: "energy-4-adult-2", theme: "Energy", level: 4, ageGroup: "Adult", question: "Ancillary services?", options: ["Core", "Grid stability support", "Bills", "Ads"], correctAnswer: 1 },
  { id: "energy-4-adult-3", theme: "Energy", level: 4, ageGroup: "Adult", question: "Demand response?", options: ["Ads", "Adjusting usage based on load", "Selling", "Buying"], correctAnswer: 1 },
  { id: "energy-4-adult-4", theme: "Energy", level: 4, ageGroup: "Adult", question: "Combined heat and power (CHP)?", options: ["Single", "Using waste heat/elec both", "Solar", "Wind"], correctAnswer: 1 },
  { id: "energy-4-adult-5", theme: "Energy", level: 4, ageGroup: "Adult", question: "Small modular reactors (SMRs)?", options: ["Large", "Compact nuclear design", "Solar", "Wind"], correctAnswer: 1 },

  // Level 5 - Kid
  { id: "energy-5-kid-1", theme: "Energy", level: 5, ageGroup: "Kid", question: "Every bit helps?", options: ["Yes", "No", "Maybe", "Later"], correctAnswer: 0 },
  { id: "energy-5-kid-2", theme: "Energy", level: 5, ageGroup: "Kid", question: "Energy expert?", options: ["Saves power", "Wastes it", "Lazy", "Loud"], correctAnswer: 0 },
  { id: "energy-5-kid-3", theme: "Energy", level: 5, ageGroup: "Kid", question: "Earth's light?", options: ["The Sun", "Phones", "TV", "Cars"], correctAnswer: 0 },
  { id: "energy-5-kid-4", theme: "Energy", level: 5, ageGroup: "Kid", question: "Nature's breath?", options: ["Wind power", "Smoke", "Dust", "No"], correctAnswer: 0 },
  { id: "energy-5-kid-5", theme: "Energy", level: 5, ageGroup: "Kid", question: "Better future?", options: ["Clean energy", "Dirty power", "Hard", "No"], correctAnswer: 0 },
  // Level 5 - Teen
  { id: "energy-5-teen-1", theme: "Energy", level: 5, ageGroup: "Teen", question: "Net-positive buildings?", options: ["Negative", "Produce more energy than used", "Normal", "Flat"], correctAnswer: 1 },
  { id: "energy-5-teen-2", theme: "Energy", level: 5, ageGroup: "Teen", question: "Virtual power plants?", options: ["Video game", "Aggregated local energy units", "Ghost", "None"], correctAnswer: 1 },
  { id: "energy-5-teen-3", theme: "Energy", level: 5, ageGroup: "Teen", question: "Space-based solar power?", options: ["Ground", "Collecting sun energy in orbit", "Moon", "Mars"], correctAnswer: 1 },
  { id: "energy-5-teen-4", theme: "Energy", level: 5, ageGroup: "Teen", question: "Superconductors?", options: ["Nets", "Zero-resistance power flow", "Fences", "Walls"], correctAnswer: 1 },
  { id: "energy-5-teen-5", theme: "Energy", level: 5, ageGroup: "Teen", question: "Thermonuclear fusion?", options: ["Fission", "Sun-like energy generation", "Burning", "Milling"], correctAnswer: 1 },
  // Level 5 - Adult
  { id: "energy-5-adult-1", theme: "Energy", level: 5, ageGroup: "Adult", question: "Blue hydrogen?", options: ["Green", "Hydrogen from fossils + CCS", "Water", "Air"], correctAnswer: 1 },
  { id: "energy-5-adult-2", theme: "Energy", level: 5, ageGroup: "Adult", question: "Grid defection?", options: ["Joining", "Leaving main grid for local", "Selling", "Buying"], correctAnswer: 1 },
  { id: "energy-5-adult-3", theme: "Energy", level: 5, ageGroup: "Adult", question: "Exergy?", options: ["Energy", "Useful work potential", "Heat", "Light"], correctAnswer: 1 },
  { id: "energy-5-adult-4", theme: "Energy", level: 5, ageGroup: "Adult", question: "Vehicle-to-grid (V2G)?", options: ["Driving", "Using EV batteries for grid", "Racing", "Farming"], correctAnswer: 1 },
  { id: "energy-5-adult-5", theme: "Energy", level: 5, ageGroup: "Adult", question: "Energy democratization?", options: ["Control", "Citizen-owned energy control", "Buying", "Selling"], correctAnswer: 1 },
];

export default questions;
