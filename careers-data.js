/* EX Venture, consolidated careers dataset.
   The live Manatal page lists ~78 postings, but the SAME role is re-posted
   many times. Here each ROLE is a single entry. All roles are based in
   Bali, Indonesia (on-site). Data derived from ex-venture.careers-page.com. */
window.CAREERS_DATA = {
  location: { city: "Bali", country: "Indonesia", mode: "Onsite" },
  departments: [
    "Engineering & Hardware",
    "AI & Data",
    "Science & Research",
    "Business & Growth",
    "Grants & Funding",
  ],
  roles: [
    {
      id: "mech-eng",
      title: "Mechanical Engineering Internship",
      dept: "Engineering & Hardware",
      detailUrl: "Job.html?slug=mech-eng",
      applyUrl: "https://ex-venture.careers-page.com/jobs/d88eb502-2711-4d76-91fc-bf5cc4654044/apply",
      blurb:
        "Hands-on exposure to design, manufacturing and system optimization, move from CAD to a working prototype on live impact tech builds.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "eng-general",
      title: "Engineering Internship",
      dept: "Engineering & Hardware",
      detailUrl: "Job.html?slug=eng-general",
      blurb:
        "Move from idea to execution, design, test, fail and improve in fast cycles alongside operators shipping real infrastructure.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "it",
      title: "IT Internship",
      dept: "Engineering & Hardware",
      detailUrl: "Job.html?slug=it",
      blurb:
        "Troubleshoot under pressure, optimize networks and turn messy technical problems into clean, documented systems.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning Engineer Internship",
      dept: "AI & Data",
      detailUrl: "Job.html?slug=ai-ml",
      applyUrl: "https://ex-venture.careers-page.com/jobs/9c5cfa20-fdfd-4483-8d47-793d34497de4/apply",
      blurb:
        "Build AI systems that integrate with real products, beyond theory, into deployment, evaluation and iteration.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "cv-ai",
      title: "Computer Vision & AI Internship",
      dept: "AI & Data",
      detailUrl: "Job.html?slug=cv-ai",
      blurb:
        "Take vision models from notebook to field, data pipelines, model training and integration with live hardware.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "bio-lead",
      title: "Biologist · Project Team Leader",
      dept: "Science & Research",
      detailUrl: "Job.html?slug=bio-lead",
      applyUrl: "https://ex-venture.careers-page.com/jobs/fe12c868-9ccf-4d3e-a701-f08a47dc1b48",
      blurb:
        "Lead a small research team across aquatic plant and biomass systems, set the experimental agenda and own the results.",
      tags: ["Full time", "Onsite"],
    },
    {
      id: "bio-aquatic",
      title: "Biologist (Aquatic Plants / Biomass) Internship",
      dept: "Science & Research",
      detailUrl: "Job.html?slug=bio-aquatic",
      applyUrl: "https://ex-venture.careers-page.com/jobs/4c3d0ab2-3f1b-44d2-b96d-71f31ea3010e/apply",
      blurb:
        "Run experiments on aquatic plant biomass systems for carbon and clean energy applications in a working field lab.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "sustain-research",
      title: "Sustainability Research Internship",
      dept: "Science & Research",
      detailUrl: "Job.html?slug=sustain-research",
      applyUrl: "https://ex-venture.careers-page.com/jobs/0abd53c8-636d-45de-84d6-ad06bfed3e6d/apply",
      blurb:
        "Translate climate and impact data into decisions, research methodologies, measure outcomes, brief the operators.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "consulting",
      title: "Consulting Internship (Spanish Speaking)",
      dept: "Business & Growth",
      detailUrl: "Job.html?slug=consulting",
      applyUrl: "https://ex-venture.careers-page.com/jobs/47293ac9-68b5-467b-a8ec-c31c2f799936/apply",
      blurb:
        "Work on real consulting projects with portfolio companies, structure problems, build the model, present to founders.",
      tags: ["Internship", "Spanish"],
    },
    {
      id: "sales",
      title: "Sales Internship",
      dept: "Business & Growth",
      detailUrl: "Job.html?slug=sales",
      applyUrl: "https://ex-venture.careers-page.com/jobs/530e5e9d-9616-4eea-a5f0-d94e75718bcf/apply",
      blurb:
        "Own the top of the funnel, research targets, run outreach and sit in on the rooms where deals get done.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "marketing",
      title: "Marketing Internship",
      dept: "Business & Growth",
      detailUrl: "Job.html?slug=marketing",
      applyUrl: "https://ex-venture.careers-page.com/jobs/6734d958-cd77-43b9-8be2-eba4947448c8/apply",
      blurb:
        "Tell the EX Venture story across channels, content, campaigns and brand for a portfolio of deep tech companies.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "hr",
      title: "Human Resources (HR) Internship",
      dept: "Business & Growth",
      detailUrl: "Job.html?slug=hr",
      blurb:
        "Identify high potential candidates, understand what drives them, and match talent to the teams that need it.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "eu-grant-writer",
      title: "EU Grant Writer Internship",
      dept: "Grants & Funding",
      detailUrl: "Job.html?slug=eu-grant-writer",
      applyUrl: "https://ex-venture.careers-page.com/jobs/50d020dc-cf64-4255-bdd8-de8f92b69044/apply",
      blurb:
        "Turn deep tech projects into fundable proposals, research calls, structure the narrative, win government backing.",
      tags: ["Internship", "4 to 6 months"],
    },
    {
      id: "eu-grants-outreach",
      title: "EU Grants Outreach & Partnerships Internship",
      dept: "Grants & Funding",
      detailUrl: "Job.html?slug=eu-grants-outreach",
      applyUrl: "https://ex-venture.careers-page.com/jobs/6a6cb2e2-19f8-4b5a-afe3-25ec06d7f432/apply",
      blurb:
        "Build the partner pipeline behind grant funded projects, map ecosystems, open doors, manage relationships.",
      tags: ["Internship", "4 to 6 months"],
    },
  ],
};
