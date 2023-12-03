import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';

export const MyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[500]),
  backgroundColor: yellow[500],
  '&:hover': {
    backgroundColor: yellow[700],
  },
}));

export const animals = [
  {
    name: "Red Panda",
    latinName: "Ailurus fulgens",
    img: "./animals/Red-Panda.jpeg",
    description:
      "The red panda has thick red fur and a striped, bushy tail. It is about the size and weight of a domestic cat. Its mischievous face and playful behavior have made it a favorite among people visiting zoos and sanctuaries.",
    region: "China"
  },
  {
    name: "Meerkat",
    latinName: "Suricata suricatta",
    img: "./animals/Meerkat.jpeg",
    description:
      "The meerkat is not a cat. It’s actually a small mongoose. Native to southern Africa, the meerkat has enormous eyes and a long tail. Meerkats have incredibly cute behavior, including sitting up high on their hind legs and looking around.",
    region: "Africa",
    selectorsChoice: true
  },
  {
    name: "hedgehog",
    latinName: "Erinaceusis",
    img: "./animals/Hedgehog.jpeg",
    description:
      "This tiny creature is known for its round, spiked body and intensely adorable facial expression. The hedgehog is a member of the Erinaceinae family. There are 15 species of hedgehog. This cute critter lives in Europe, Asia, and Africa. Hedgehogs were introduced to New Zealand. There are no hedgehogs in Australia or North America. Hedgehogs are tiny, but they are not defenseless. Their sharp teeth and spines make them difficult for predators to catch and eat.",
    region: "Europe"
  },
  {
    name: "Quokka",
    latinName: "Setonix brachyurus",
    img: "./animals/Quokka.jpeg",
    description:
      "The quokka is also known as the short-tailed scrub wallaby. It is a small, round creature about the size of a cat. Its face looks like a cross between a mouse and a rabbit. The quokka is a marsupial. It’s nocturnal and carries its young in a pouch.",
    region: "Australia"
  },
  {
    name: "Sea Otter",
    latinName: "Enhydra lutris",
    img: "./animals/Sea-Otter.jpeg",
    description:
      "Recently, a sea otter named Joey captured the hearts of YouTube viewers who watched as he was rescued from near death and raised at an otter sanctuary in Canada. Joey’s daily fight for survival and his love of toys drew millions of viewers. That’s not surprising, since a sea otter is one of the most adorable animals on land or sea. The smallest marine mammal, the sea otter is a marine mammal native to the coasts of the northern and eastern North Pacific Ocean. About 90% of the world’s sea otters live in Alaska.",
    region: "Alaska",
    selectorsChoice: true
  }
];

export const mySkills = [
  {
    name: "javaScript",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/262px-Unofficial_JavaScript_logo_2.svg.png",
    description: "super star JS developer "
  },
  {
    name: "HTML",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/131px-HTML5_logo_and_wordmark.svg.png",
    description: "Intermediate HTML skills"
  },
  {
    name: "CSS",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/langfr-130px-CSS3_logo_and_wordmark.svg.png",
    description: "I know how to align elemnts with flexbox"
  }
];

export const initialToDoList = [
  {
    todo: "Task1",
    complete: false,
    id: 3456789,
    priority: "Medium",
    deadline: "2023-11-28T10:00"
  },
  {
    todo: "Task2",
    complete: false,
    id: 3456790,
    priority: "High",
    deadline: "2023-12-01T10:00"
  },
  {
    todo: "Task3",
    complete: false,
    id: 3456791,
    priority: "Low",
    deadline: "2023-12-09T10:00"
  }
];

export const activityTypes = [
  { name: "Questionnaries", type: "questionnaire", one: "Questionnarie" },
  { name: "Therapy journal", type: "journaltherapy", one: "Therapy journal" },
  { name: "Gratitude journal", type: "journalgratitude", one: "Gratitude journal" },
  { name: "Exercises", type: "exercise", one: "Exercise" },
  { name: "Goals", type: "goal", one: "Goal" },
  { name: "Emotion protocol", type: "emotionprotocol", one: "Emotion protocol" }
];

export const miniApps = [
  {
    name: "Portfolio",
    image: "portfolio.jpg",
    description: "Render a list of your skills.",
    requirements: [
      "display a photo of the skill",
      "display the name of the skill",
      "have on click handler to display more details about the skill",
      "clicking on the same skill should hide the description",
      "clicking on a new skill while there is already a description displayed should show the new one"
    ],
    tips: [
      'use a pre-defined array "mySkills"',
      "use a <li> tag to render each skill group",
      'add the class "skill-item" to your <li> to use the pre-defined CSS rules',
      "do not forget to pass a unique key to your <li>"
    ],
    link: "https://codesandbox.io/s/portfolio-skills-list-unnwl",
    linkText: "Original task link"
  },
  {
    name: "Emoji Mood Tracker",
    image: "emoji.jpg",
    description:
      "Create an Emoji Mood Tracker that allows users to select an emoji that represents their current mood and save it.",
    requirements: [
      "Display a set of emojis (happy, sad, excited, etc.) as options.",
      "Allow users to click on an emoji and date to select it.",
      "Display the selected emoji and allow users to submit it.",
      "Show the selected emoji and current date as the user's current mood in a row."
    ]
  },
  {
    name: "Todo App",
    image: "todo.jpg",
    description:
      "Build a simple Todo App that enables users to add, edit, and delete tasks.",
    requirements: [
      "Provide an input field for users to enter new tasks.",
      "Display a list of tasks with checkboxes.",
      "Allow users to check tasks as completed or uncompleted.",
      "Enable users to edit and update task names.",
      "Allow users to delete tasks."
    ]
  },
  {
    name: "Basic Calculator",
    image: "calc.jpg",
    description:
      "Create a basic calculator that can perform addition, subtraction, multiplication, and division.",
    requirements: [
      "Display a calculator interface with buttons for digits (0-9), operators (+, -, *, /), and equals (=).",
      "Allow users to input mathematical expressions.",
      "Implement the functionality to perform basic calculations.",
      "Display the result of the calculation."
    ]
  },
  {
    name: "Random Quote Generator",
    image: "quotes.jpg",
    description:
      "Develop a Random Quote Generator that displays inspirational or motivational quotes.",
    requirements: [
      "Store a collection of quotes in an array or object.",
      "Implement a button that generates and displays a random quote when clicked.",
      "Display the author's name along with each quote.",
      "Allow users to share the displayed quote on social media."
    ]
  },
  {
    name: "Tic-Tac-Toe Game",
    image: "tictactoe.jpg",
    description:
      "Create a two-player Tic-Tac-Toe game where players take turns marking X and O on a grid.",
    requirements: [
      "Display a 3x3 grid for the game board.",
      "Alternate between X and O for each player's turn.",
      "Check for a win condition (three in a row horizontally, vertically, or diagonally) and declare a winner.",
      "Implement a reset button to start a new game."
    ]
  },
  {
    name: "Thinking in React",
    image: "lesson10.jpg",
    description: "Implement a UI in React.",
    requirements: [
      "Step 1: Break the UI into a component hierarchy.",
      "Step 2: Build a static version in React.",
      "Step 3: Find the minimal but complete representation of UI state.",
      "Step 4: Identify where your state should live.",
      "Step 5: Add inverse data flow"
    ]
  },
  {
    name: "Activity page of user",
    image: "activity.jpg",
    description: "Create the mini-App.",
    requirements: [
      "Fetch recent activities from API.",
      "Display results in a list.",
      "List should be filterable by filter bar.",
      "When clicking on an item, more details appear."
    ],
    link: "http://ec2-3-67-177-63.eu-central-1.compute.amazonaws.com:8055/items/userActivities",
    linkText: "API link"
  },
  {
    name: "Jokes app",
    image: "jokes.jpg",
    description: "Create the mini-App.",
    requirements: [
      "Fetch random jokes from API.",
      "4 random jokes are displayed.",
      'When user clicks "Show", show joke solution.',
      "User can save them to his/her library.",
      "When user click refresh button, fetch API with new jokes."
    ],
    link: "https://official-joke-api.appspot.com/random_ten",
    linkText: "API link"
  }
];