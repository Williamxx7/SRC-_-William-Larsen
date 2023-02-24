//Mit program består af to polygoner som bliver lavet via en klasse. 
//Jeg har også en functions function som laver funktioner for de to polygoner. 
//Mit program fungerer så på den måde at den bruger dist() altså distanceformlen funktionen som er indbygget i p5js til at finde ud af om de to polygoner er tætte nok på hinanden til det giver mening at begynde NR. 
//Hvis det er det køre programmet igennem 3 for løkker som sørger for der bliver kørt NR for hver mulighed.  


let p1;
let p2;

let tolerance = 0.00001;

let functions1 = [];
let functions2 = [];

let rectpoly1 = [];
let rectpoly2 = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  let x1;
  let x2;
  let y2;
  let y1;

  let x11;
  let x22;
  let y11;
  let y22;

  let checkCollision;

  let x;
  let max;
  let xn;

  let f = 0;
  let f2 = 0;
  let p = 0;
  let dp = 0;

  // laver vores to polygoner ud fra vores class hvor vi definere dem som p1 og p2
  p1 = new Polygon(
    width / 2 -100, // Position x
    height / 2, //Position y
    random(-3, 3), // Eventuel x retning 
    random(-3, 3), // Eventuel y retning
    3, // Antal sider 
    70, // Radius
    color(255, 0, 0, 200) // Farve på polygon
  );
  p2 = new Polygon2(
    width / 2, // Position x
    height / 2, // Position y
    random(-3, 3), // Eventuel x retning 
    random(-3, 3),  // Eventuel y retning
    5, // Antal sider 
    110, // Radius 
    color(0, 255, 0, 150) // Farve på polygon
  );
}

function draw() {
  background(69);

  // "Sletter" alt vores indhold i vores arrays så de kan blive opdateret til den nye værdi.
  p1.koordinates = [];
  p2.koordinates = [];

  // "Sletter" alt vores indhold i vores arrays så de kan blive opdateret til den nye værdi.
  functions1 = [];
  functions2 = [];

  // "Sletter" alt vores indhold i vores arrays så de kan blive opdateret til den nye værdi.
  rectpoly1 = [];
  rectpoly2 = [];

  // Kalder vores to polygoner vi lavede i setup og tegner dem med den funktion vi har lavet i vores class
  p1.createPolygon();
  p2.createPolygon();

  //Sætter vores figur p1 til at have de samme koordianter som vores mus
  p1.posx = mouseX;
  p1.posy = mouseY;

  // Kalder vores funktioner i draw
  createFunctions();
  //print(functions1)
  //print( functions2)
  newtonRapson();
}

function createFunctions(x1,x2,y1,y2,x11, y11, x22, y22) {
  //laver funktion og firkanter for hver linje i den første polygon
  // Vi burger vores koordinates arrays længde som bliver lavet i classen for polygonerne for at være sikker på at vi altid har den rigtige mængde funktion også selvom vi ændre noget i koden.
  for (let i = 0; i < p1.koordinates.length; i++) {
    if (i < p1.koordinates.length - 1) {
      //giver de forskellige koordinater værdier
      y2 = p1.koordinates.map((k) => k.y)[i + 1];
      y1 = p1.koordinates.map((k) => k.y)[i];

      x2 = p1.koordinates.map((k) => k.x)[i + 1];
      x1 = p1.koordinates.map((k) => k.x)[i];

      //Vores funktioner bliver udregnet ved brug af funktionen ud fra to punkter som er formlen a = y2 - y1  / x2 - x1
      let a = (y2 - y1) / (x2 - x1 + 0.01);
      //Her finder vi så b ved brug af formlen b = y1 -a *x1
      let b = y1 - a * x1;

      //Her tegner vi firkanterne
      //rect(x1, y1, vv, vb)

      rectpoly1.push({ x1, y1, x2, y2 });

      // her putter vi funktionerne ind i et array så vi kan tilgå dem senere til newton raphson method
      functions1.push({ a: a, b: b });
    } else {
      // Her sker det samme forskellen er bare at den tager den tager de første punkter fordi det er den sidste funktion der skal laves.
      y2 = p1.koordinates.map((k) => k.y)[0];
      y1 = p1.koordinates.map((k) => k.y)[i];

      x2 = p1.koordinates.map((k) => k.x)[0];
      x1 = p1.koordinates.map((k) => k.x)[i];

      let a = (y2 - y1) / (x2 - x1+0.1);
      let b = y1 - a * x1;

      rectpoly1.push({ x1, y1, x2, y2 });
      functions1.push({ a: a, b: b });
    }
  }

  //laver funktion og firkanter for hver linje i den anden polygon fungere præcis på samme måde som ved den første polygon
  for (let i = 0; i < p2.koordinates.length; i++) {
    if (i < p2.koordinates.length - 1) {
      y22 = p2.koordinates.map((k) => k.y)[i + 1];
      y11 = p2.koordinates.map((k) => k.y)[i];

      x22 = p2.koordinates.map((k) => k.x)[i + 1];
      x11 = p2.koordinates.map((k) => k.x)[i];

      let a1 = (y22 - y11) / (x22 - x11+0.1);
      let b1 = y11 - a1 * x11;

      // Her bliver der tildelt firkanternes koordinater til et array
      rectpoly2.push({ x11, y11, x22, y22 });
      // Her bliver der tildelt funktionerne til functions2 arrayet som er over vores polygon2
      functions2.push({ a1: a1, b1: b1 });
    } else {
      // Her sker det samme bare for vores sidste funktion i poltgon2.
      y22 = p2.koordinates.map((k) => k.y)[0];
      y11 = p2.koordinates.map((k) => k.y)[i];

      x22 = p2.koordinates.map((k) => k.x)[0];
      x11 = p2.koordinates.map((k) => k.x)[i];

      let a1 = (y22 - y11) / (x22 - x11+0.1);
      let b1 = y11 - a1 * x11;

      rectpoly2.push({ x11, y11, x22, y22 });
      functions2.push({ a1: a1, b1: b1 });
    }
  }
}

function newtonRapson(x, xn , max, checkCollision, f, f2, p ,dp) {
  // Tjekker om de to polygoner er tæt på hinaden ved at bruge distanceformeln hvor vi i præncippet de to polygoner svare til cirkler.
  // Det gør vi fordi så ved vi cirka hvornår vi skal starte med at bruge newton raphson metoden
  checkCollision = dist(p1.posx + 10, p1.posy, p2.posx, p2.posy);

  // tjekker om de de to "cirkler" ud fra polygonen rammer
  if (checkCollision <= p1.r + p2.r) {
    //!console.log(functions1.length)
    //!text("Næsten kollison", width/26,height/10)
    // Sætter vores vædier til newthon rapson
    x = 10;
    xn = 0;
    max = 2;

    for (f = 0; f < functions1.length; f++) {
      for (f2 = 0; f2 < functions2.length; f2++) {

        /**
        * Pesudo kode af Newtons Rapson.
        * @param {Array<Object>} functions1 - Vores første funktion
        * @param {Array<Object>} functions2 - Vores anden funktion
        * @param {number} max - Maksimale antal gange newton rapson bliver udregnet. 
        * @param {number} x - Vores gæt som senere bliver vores svar. 
        * @param {number} tolerance - Tolerance hvor præcis løsningen skal være før den bliver vist som et skæringspunkt.
        */


        for (let b = 0; b < max; b++) {
          p = (x) =>
            functions1.map((k) => k.a)[f] * x +
            functions1.map((k) => k.b)[f] -
            (functions2.map((k) => k.a1)[f2] * x +
              functions2.map((k) => k.b1)[f2]);
          dp = (x) =>
            functions1.map((k) => k.a)[f] - functions2.map((k) => k.a1)[f2];

          // Inspiration fra https://mathtxa.systime.dk/?id=500 
          xn = x - p(x) / dp(x);

          if (abs(xn - x) < tolerance) {
            // Laver en definationsmængde ved brug af vores firkant koordinater vi har gemt i arrayerne som gør at den kun vise de 
            // skæringspunkter der er relevante for vores figur da den består af massere af funktioner.
            if (
              x >=
                Math.min(
                  rectpoly2.map((k) => k.x11)[f2],
                  rectpoly2.map((k) => k.x22)[f2]
                ) &&
              x <=
                Math.max(
                  rectpoly2.map((k) => k.x11)[f2],
                  rectpoly2.map((k) => k.x22)[f2]
                ) &&
              functions1.map((k) => k.a)[f] * x +
                functions1.map((k) => k.b)[f] >=
                5 -
                  Math.min(
                    rectpoly2.map((k) => k.y11)[f2],
                    rectpoly2.map((k) => k.y22)[f2]
                  ) &&
              functions1.map((k) => k.a)[f] * x +
                functions1.map((k) => k.b)[f] <=
                5 +
                  Math.max(
                    rectpoly2.map((k) => k.y11)[f2],
                    rectpoly2.map((k) => k.y22)[f2]
                  ) &&
              x >=
                Math.min(
                  rectpoly1.map((k) => k.x1)[f],
                  rectpoly1.map((k) => k.x2)[f] + 0.01
                ) &&
              x <=
                Math.max(
                  rectpoly1.map((k) => k.x1)[f],
                  rectpoly1.map((k) => k.x2)[f] + 0.01
                ) // &&
              //functions1.map(k => k.a)[f] * x + functions1.map(k => k.b)[f] >= Math.min(rectpoly1.map(k => k.y1)[f2],(rectpoly1.map(k => k.y2)[f2])) &&
              //functions1.map(k => k.a)[f] * x + functions1.map(k => k.b)[f] <= Math.max(rectpoly1.map(k => k.y1)[f2],(rectpoly1.map(k => k.y2)[f2]))
            ) {

              fill(20, 20,20,40)
              rect(35, 35, 115,45, 10)
              textSize(25);
              fill(255, 255, 255);
              // Viser i canvas der er kollison
              text("Kollision", 45 , 65);
              //!text("Intersectionpoint " + "x: " + x+ "y: " + functions1.map(k => k.a)[f] * x + functions1.map(k => k.b)[f],width/26,height/12 )
              //printer skæringspunkterne i consolen
              console.log(
                "Intersectionpoint " +
                  "x: " +
                  x +
                  "y: " +
                  functions1.map((k) => k.a)[f] * x +
                  functions1.map((k) => k.b)[f]
              );

              fill(0, 0, 255);
              noStroke();

              circle(
                x,
                functions1.map((k) => k.a)[f] * x +
                  functions1.map((k) => k.b)[f],
                10
              );
            }
            break;
          }
          x = xn;
        }
      }
    }
  }
}


class Polygon {
  /**
   * Attributter for polygon klassen.
   * @param {number} Posx - Vores polygon x koordiant.
   * @param {number} Posy - Vores polygon y koordiant.
   * @param {number} vecx - Vores hastighed i x retningen.
   * @param {number} vecy - Vores hastighed i y retningen.
   * @param {number} edges - Antal kanter vores figur skal have.
   * @param {number} r - radius som er vores radius af vores polygon.
   * @param {string} farve - farve for vores polygon.
   * @param {array()} koordinates - Array af alle polygones koordinater.
   */

  /**
   * Konstruktør for polygon klassen.
   * Består af alle vores attributter.
   */
  constructor(posx, posy, vecx, vecy, edges, r, farve, koordinates) {
    this.posx = posx;
    this.posy = posy;
    this.vecx = vecx;
    this.vecy = vecy;
    this.edges = edges;
    this.r = r;
    this.farve = farve;
    this.koordinates = [];
  }
  createPolygon() {
    noStroke();
    stroke(this.farve);
    fill(this.farve);


    // Fundet påp5js.org/examples/form-regular-polygon.html
    beginShape();
    //print(this.edges)
    for (let i = 0; i < this.edges; i++) {
      let a = (TWO_PI / this.edges) * i;
      let x = this.r * cos(a) + this.posx;
      let y = this.r * sin(a) + this.posy;
      vertex(x, y);
      this.koordinates.push({ x: x, y: y });
    }
    endShape(CLOSE);
  }
}


// Underklassen(Child-class) over Polygon klassen. Den er ikke nødvendig men viser hvordan man ville gøre det. 
class Polygon2 extends Polygon {
  constructor(posx, posy, vecx, vecy, edges, r, farve, koordinates) {
      super(posx, posy, vecx, vecy, edges, r, farve, koordinates)
  }

  createPolygon() {
    noStroke();
    stroke(this.farve);
    fill(this.farve);


    // Inpiration fra p5js.org/examples/form-regular-polygon.html
    beginShape();
    //print(this.edges)
    for (let i = 0; i < this.edges; i++) {
      let a = (TWO_PI / this.edges) * i;
      let x = this.r * cos(a) + this.posx;
      let y = this.r * sin(a) + this.posy;
      vertex(x, y);
      this.koordinates.push({ x: x, y: y });
    }
    endShape(CLOSE);
  }

}