# import os
# os.environ["SERPER_API_KEY"] = "Your Key" # serper.dev API key
# os.environ["OPENAI_API_KEY"] = "Your Key"

from crewai import Crew, Process
from crewai import Task
from crewai_tools import SerperDevTool
from crewai import Agent
from dotenv import load_dotenv
load_dotenv()

search_tool = SerperDevTool()

# Agents
# Creating a senior researcher agent with memory and verbose mode
researcher = Agent(
    role='Senior Researcher',
    goal='Uncover groundbreaking technologies in {topic}',
    verbose=True,
    memory=True,
    backstory=(
        "Driven by curiosity, you're at the forefront of"
        "innovation, eager to explore and share knowledge that could change"
        "the world."
    ),
    tools=[search_tool],
    allow_delegation=True
)

# Creating a writer agent with custom tools and delegation capability
writer = Agent(
    role='Writer',
    goal='Narrate compelling tech stories about {topic}',
    verbose=True,
    memory=True,
    backstory=(
        "With a flair for simplifying complex topics, you craft"
        "engaging narratives that captivate and educate, bringing new"
        "discoveries to light in an accessible manner."
    ),
    tools=[search_tool],
    allow_delegation=False
)

writer = Agent(
    role='SparqlExpert',
    goal='Narrate compelling tech stories about {topic}',
    verbose=True,
    memory=True,
    backstory=(
        """You are a knowledge graph accessible via SPARQL.
        Your dataset is built using schema.org as the underlying structure,
        and using Wikipedia URIs in order to identify resources
        (these use the namespace prefixes schema: and wiki: respectively. 
        The schema.org properties and classes are all defined using SHACL.
        Translate each prompt into a SPARQL query (and display this prompt),
        then produce sample output from this query as Turtle.
        Continue until the words "end queries" are typed as a prompt.
        If a property URI is not in the schema.org namespace,
        then use ex: <https://example.com/ns#> as the namespace for the property. """
    ),
    tools=[search_tool],
    allow_delegation=False
)


# Tasks
# Research task
research_task = Task(
    description=(
        "Identify the next big trend in {topic}."
        "Focus on identifying pros and cons and the overall narrative."
        "Your final report should clearly articulate the key points"
        "its market opportunities, and potential risks."
    ),
    expected_output='A comprehensive 3 paragraphs long report on the latest AI trends.',
    tools=[search_tool],
    agent=researcher,
)

# Writing task with language model configuration
write_task = Task(
    description=(
        "Compose an insightful article on {topic}."
        "Focus on the latest trends and how it's impacting the industry."
        "This article should be easy to understand, engaging, and positive."
    ),
    expected_output='A 4 paragraph article on {topic} advancements formatted as markdown.',
    tools=[search_tool],
    agent=writer,
    async_execution=False,
    output_file='new-blog-post.md'  # Example of output customization
)

sparql_task = Task(
    description=(
        "Compose an insightful article on {topic}."
        "Focus on the latest trends and how it's impacting the industry."
        "This article should be easy to understand, engaging, and positive."
    ),
    expected_output='A 4 paragraph article on {topic} advancements formatted as markdown.',
    tools=[search_tool],
    agent=writer,
    async_execution=False,
    output_file='new-blog-post.md'  # Example of output customization
)

# Crew


# Forming the tech-focused crew with enhanced configurations
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.sequential  # Optional: Sequential task execution is default
)


# Run
# Starting the task execution process with enhanced feedback
result = crew.kickoff(inputs={'topic': 'AI in healthcare'})
print(result)
