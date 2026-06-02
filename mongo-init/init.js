db = db.getSiblingDB("fitnessTracker");

db.exercises.insertMany([
  { name: "Crunches", category: "Abs" },
  { name: "Leg Raises", category: "Abs" },

  { name: "Assisted Chin Up", category: "Back" },
  { name: "Assited Pull Up", category: "Back" },
  { name: "Barbell Row", category: "Back" },
  { name: "Cable Row", category: "Back" },
  { name: "Chin Up", category: "Back" },
  { name: "Deadlift", category: "Back" },
  { name: "Dumbell Row", category: "Back" },
  { name: "Hyperextensions", category: "Back" },
  { name: "Pull Up", category: "Back" },
  { name: "Pulldowns", category: "Back" },

  { name: "Barbell Bicep Curl", category: "Biceps" },
  { name: "Concentration Curl", category: "Biceps" },
  { name: "Dumbell Bicep Curl", category: "Biceps" },
  { name: "Hammer Curl", category: "Biceps" },

  { name: "Running", category: "Cardio" },

  { name: "Bench Press", category: "Chest" },
  { name: "Cable Crossovers", category: "Chest" },
  { name: "Dumbell Press", category: "Chest" },
  { name: "Dumbell Flies", category: "Chest" },
  { name: "Incline Bench Press", category: "Chest" },
  { name: "Incline Dumbell Press", category: "Chest" },
  { name: "Machine Flies", category: "Chest" },

  { name: "Calf Raises", category: "Legs" },
  { name: "Front Squat", category: "Legs" },
  { name: "Leg Curls", category: "Legs" },
  { name: "Leg Extensions", category: "Legs" },
  { name: "Leg Press", category: "Legs" },
  { name: "Lunges", category: "Legs" },
  { name: "Seated Calf Raises", category: "Legs" },
  { name: "Squat", category: "Legs" },
  { name: "Romanian Deadlift", category: "Legs" },
  { name: "Bulgarian Split Squat", category: "Legs" },

  { name: "Dumbell Lateral Raises", category: "Shoulders" },
  { name: "Military Press", category: "Shoulders" },
  { name: "Shoulder Dumbell Press", category: "Shoulders" },
  { name: "Upright Rows", category: "Shoulders" },

  { name: "Assisted Dips", category: "Triceps" },
  { name: "Close Grip Bench Press", category: "Triceps" },
  { name: "Dips", category: "Triceps" },
  { name: "Pushdowns", category: "Triceps" },
  { name: "Triceps Extentions", category: "Triceps" }
]);