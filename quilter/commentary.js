var helpers = require('../helpers.js'),
    Improv = require('improv');

const spec = {
  root: {
    groups: [
      {
        phrases: [
          "This is [a :great] project for using pre-cut [squares #2-10] [:unit] squares.",
          "[cap :gemutlich] and [:gemutlich]",
          "This quilt will be perfectly [:gemutlich]",
          "Use your four [squares #4-10] [:squareType] squares in the four corner blocks.",
          "Press seams to the left on row [#1-4] and press seams to the right on row [#1-4]",
          "I like to use [a :fabric] or [:fabric] blend batting",
          "Using [:fabric] for your batting will make this quilt extra [:gemutlich]",
          "[cap :quilting] is [a :journey]",
          "Read all the way through the entire pattern before you start.",
          "Always keep the [:perfectThings] of your fabrics matched up",
          "This will be so [:gemutlich] [:somewhere]",
          "Don't worry if [:hasMistakes] -- it'll still be [:gemutlich]",
          "Breathe.",
          "A finished quilt which has no [:mistakes] is one that was created within the quilter’s comfort zone.",
          "When you are finished, and it is quilted and sitting [:somewhere], will you really care if it [:hasMistakes]?",
          "There is no wrong time for [:quilting].",
          "Don't be afraid to make mistakes. That's part of [:quilting].",
          "When you sleep under this quilt, you sleep under a blanket of love.",
          "May this quilt warm your [:bodypart] and comfort your [:bodypart].",
          "Measure twice, cut once.",
          "There are no quilting police.",
          "[cap :mistakes] can turn into [:gemutlich] new creations - that's part of the [:journey].",
          "Maybe it [:hasMistakes], but it's [:gemutlich] and made with love."
        ]
      }
    ]
  },
  
  hasMistakes: {
    groups: [
      {
        phrases: [
          "has [:mistakes]",
          "isn't perfect",
          "doesn't have perfect [:perfectThings]"
        ]
      }
    ]
  },

  mistakes: {
    groups: [
      {
        phrases: [
          "mistakes",
          "imperfections",
          "errors",
          "quirks",
          "accidents"
        ]
      }
    ]
  },

  bodypart: {
    groups: [
      {
        phrases: [
          "heart",
          "soul",
          "body",
          "brain",
          "mind"
        ]
      }
    ]
  },
  perfectThings: {
    groups: [
      {
        phrases: [
          "points",
          "seams",
          "stitches",
          "edges",
          "colors",
          "contrast",
          "knots",
          "borders"
        ]
      }
    ]
  },
  
  journey: {
    groups: [
      {
        phrases: [
          "journey",
          "process",
          "adventure",
          "learning process"
        ]
      }
    ]
  },
  
  quilting: {
    groups: [
      {
        phrases: [
          "quilting",
          "creativity",
          "making things",
          "being an artist",
          "being a quilter",
          "art",
          "crafting",
          "learning something new"
        ]
      }
    ]
  },
  
  great: {
    groups: [
      {
        phrases: [
          "ideal",
          "great",
          "easy",
          "fun",
          "wonderful",
          "kid-friendly"
        ]
      }
    ]
  },
  squareType: {
    groups: [
      {
        phrases: [
          "neon",
          "light",
          "dark",
          "squarest",
          "brightest",
          "red",
          "green",
          "white",
          "black",
          "grey",
          "purple",
          "orange",
          "pink",
          "yellow",
          "brown",
          "turqoise",
          "gold",
          "vintage",
          "patterned",
          "floral",
          "unique",
          "scrap"          
        ]
      }
    ]
  },
  fabric: {
    groups: [
      {
        phrases: [
          "cotton",
          "cotton/poly",
          "wool",
          "down",
          "silk",
          "bamboo",
          "polyester",
          "high-loft [:fabric]",
          "low-loft [:fabric]",
          "super-fluffy [:fabric]",
          "100% [:fabric]"
        ]
      }
    ]
  },
  gemutlich: {
    groups: [
      {
        phrases: [
          "soft",
          "cozy",
          "warm",
          "snuggly",
          "comfortable",
          "sentimental",
          "well-loved",
          "heavy",
          "light",
          "fluffy",
          "colorful",
          "pretty",
          "soothing",
          "calming"
        ]
      }
    ]
  },
  somewhere: {
    groups: [
      {
        phrases: [
          "on your bed",
          "on your couch",
          "in your bedroom",
          "in your baby's room",
          "under the stars",
          "at a picnic",
          "on the wall",
          "on your lap",
          "in the backyard",
          "around your shoulders"
        ]
      }
    ]
  },
  unit: {
    groups: [
      {
        phrases: [
          "inch",
          "centimeter"
        ]
      }
    ]
  }
}

function commentary() {

  const improv = new Improv(spec,
   {
      builtins: {
        squares (str) { return str + " x " + str; } 
      }
    }
  );
  return improv.gen('root');
  
}

module.exports = commentary;