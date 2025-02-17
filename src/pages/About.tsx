
const About = () => {
  return (
    <div className="page-transition space-y-12 py-12 max-w-4xl mx-auto">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="text-muted-foreground">Get to know me better</p>
      </header>

      <div className="glass rounded-lg p-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Hello!</h2>
          <p className="text-muted-foreground leading-relaxed">
            I'm a passionate frontend developer and designer with a keen eye for
            detail and a love for creating beautiful, functional web experiences.
            With several years of experience in the field, I specialize in React,
            TypeScript, and modern web technologies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {[
              "React",
              "TypeScript",
              "JavaScript",
              "HTML/CSS",
              "Tailwind",
              "UI/UX Design",
              "Figma",
              "Node.js",
              "Git",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-primary/10 text-primary px-3 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground">
            Feel free to reach out for collaborations or just to say hi!
          </p>
          <a
            href="mailto:contact@example.com"
            className="inline-block text-primary hover:underline"
          >
            contact@example.com
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
