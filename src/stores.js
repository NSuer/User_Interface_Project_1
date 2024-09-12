import { writable } from "svelte/store";
import { readable } from 'svelte/store';

// Store for theme
export const colors = {
  background: {
    grey: "#d3d3d3",
    white: "#ffffff",
    pink: "#e6cce6",
    purple: "#b0c4de",
  },
  primary: {
    black: "#333333",
    red: "#cc6666",
    blue: "#6699cc",
    yellow: "#cccc66",
    green: "#66cc66",
    orange: "#cc9966",
    brown: "#8b4513"
  },
  secondary: {
    black: "#333333",
    red: "#cc6666",
    blue: "#6699cc",
    yellow: "#cccc66",
    green: "#66cc66",
    orange: "#cc9966",
    brown: "#8b4513"
  }
};

export let backgroundArray = Object.values(colors.background);
export let primaryArray = Object.values(colors.primary);
export let secondaryArray = Object.values(colors.secondary);

export let backgroundColor = writable(colors.background.grey);
export let primaryColor = writable(colors.primary.black);
export let secondaryColor = writable(colors.secondary.black);

export function setBackgroundColor(color) {
  backgroundColor.set(colors.background[color]);
}

export function setPrimaryColor(color) {
  primaryColor.set(colors.primary[color]);
}

export function setSecondaryColor(color) {
  secondaryColor.set(colors.secondary[color]);
}

export let userData = writable({
  name: " Jane Doe",
  email: "JaneDoe@example.com",
  password: "password",
  daysActive: 20,
  startDate : "2021-01-01",
});

export let dailyEntries = writable([]);

// This is more of template for the daily entry, I used chatgpt to turn this into a class
// export const DailyEntry = {
//   date: "",
//   time: "",
//   activities: []
// };
export class DailyEntry {
  constructor(date = "", time = "", activities = []) {
    this.date = date;
    this.time = time;
    this.feelingActivity = new FeelingActivity();
    this.imageActivity = new ImageActivity();
    this.prayerActivity = new PrayerActivity();
    this.journalActivity = new JournalActivity();
    this.reflectionActivity = new ReflectionActivity();
    this.silentContemplationActivity = new SilentContemplationActivity();
  }
}

// This is just a list of the activities that can be done and the fields that will be stored, I used chatgpt to turn thsese into classes
// export const Activities =[
//     {
//         type: "Feeling",
//         description : "How are you feeling today?",
//         Completed: false,
//         options: [
//         "Happy",
//         "Sad",
//         "Angry",
//         "Anxious",
//         "Excited",
//         "Calm",
//         "Tired",
//         "Energetic",
//         "Focused",
//         "Distracted",
//         "Motivated",
//         "Unmotivated"
//         ],
//         selected: []
//     },
//     {
//         type: "Image",
//         description: "Upload an image that represents your day",
//         Completed: false,
//         image: null,
//         caption: "",
        
//     },
//     {
//         type: "Prayer",
//         description: "Indicate if you prayed today",
//         boolPrayed: false,
//         Completed: false,
//     },
//     {
//         type: "Journal",
//         description: "Write about your day and spiritual journey",
//         Completed: false,
//         text: ""
//     },
//     {
//         type: "Reflection",
//         description: "Reflect on a verse or passage. Write your thoughts",
//         Completed: false,
//         text: "",
//         verse: ""
//     },
//     {
//         type: "Silent Contemplation",
//         description: "Sit in silence and reflect. Write your thoughts",
//         Completed: false,
//         text: ""
//     }
//   ];


export class Activity {
    constructor(type, description, completed = false) {
      this.type = type;
      this.description = description;
      this.completed = completed;
    }
  }
  
export class FeelingActivity extends Activity {
constructor() {
    super("Feeling", "How are you feeling today?");
    this.options = [
    "Happy", "Sad", "Angry", "Anxious", "Excited",
    "Calm", "Tired", "Energetic", "Focused", "Distracted",
    "Motivated", "Unmotivated"
    ];
    this.selected = [];
}
}

export class ImageActivity extends Activity {
constructor() {
    super("Image", "Contemplate over an image that represents your day.");
    this.time = null;
}
}

export class PrayerActivity extends Activity {
constructor() {
    super("Prayer", "Indicate if you prayed today");
    this.boolPrayed = false;
}
}

export class JournalActivity extends Activity {
constructor() {
    super("Journal", "Write about your day and spiritual journey");
    this.text = "";
}
}

export class ReflectionActivity extends Activity {
constructor() {
    super("Reflection", "Reflect on a verse or passage. Write your thoughts");
    this.text = "";
    this.verse = "";
}
}

export class SilentContemplationActivity extends Activity {
constructor() {
    super("Silent Contemplation", "Sit in silence and reflect. Write your thoughts");
    this.text = "";
}
}

  