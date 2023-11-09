export function onRequest(context) {
  const me = {
    name: "Samrut",
    homepage: "don't have one yet!",
    githubURL: "https://github.com/SamrutGadde",
    interestingFact: "I love to play the guitar!",
    skills: ["JavaScript", "Python", "C/C++", "Java", "HTML/CSS", "ReactJS", "Svelte", "TailwindCSS", "PostgreSQL", "mySQL", "MongoDB", "NodeJS", "ExpressJS", "EC2", "S3", "STM32", "React Native", "C#"]
  }
  return new Response(JSON.stringify(me))
}