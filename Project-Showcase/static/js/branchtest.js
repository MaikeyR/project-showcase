const axios = require('axios');

const studentAccountName = "Maikel Reijneke"; // This should eventually be linked to CHE account logins.

// Personal Access Token (PAT)
const accessToken = "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"; // Replace with your actual GitHub Personal Access Token

// Other form data (example values)
const projectTitle = "My Project";
const projectDescription = "This is my project";
const authors = "John Doe";
const client = "Client X";
const theme = "Technology";
const tags = "web, development";
const thumbnail = "project-thumbnail.jpg";

async function generateProject(projectTitle, projectDescription, authors, client, theme, tags, thumbnail) {
  try {
    const sanitizedTitle = projectTitle.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
    const projectID = sanitizedTitle.toLowerCase();
    const allAuthors = studentAccountName + ", " + authors;

    const projectContent = compileProjectContent();

    const markdownContent = generateMarkdownContent(projectTitle, projectDescription, allAuthors, client, theme, tags, thumbnail, projectContent, projectID);
    await createBranch(projectID, markdownContent);

    console.log("Project created successfully!");
  } catch (error) {
    console.error("Failed to create project:", error);
  }
}

function compileProjectContent() {
  // Implement the logic to compile your project content here
  // This function should return the content of your project
  return "Your project content goes here";
}

function generateMarkdownContent(projectTitle, projectDescription, allAuthors, client, theme, tags, thumbnail, projectContent, projectID) {
  // Implement the logic to generate markdown content here
  // Return the markdown content as a string
  return `Your markdown content goes here`;
}

async function createBranch(projectID, markdownContent) {
  // Implement the logic to create a branch here
  // Use axios to make API calls to GitHub
  const branchName = projectID;
  const baseBranch = "main"; // Replace main with the name of the base branch if it's different

  try {
    // Fetch the commit SHA of the base branch
    const response = await axios.get(`https://api.github.com/repos/MaikeyR/project-showcase/branches/${baseBranch}`);
    if (response.status === 200) {
      const data = response.data;
      console.log("Branch Data:", data);
      const commitSHA = data.commit.sha;

      console.log("Branch Name:", branchName);
      console.log("Commit SHA:", commitSHA);

      // Use the GitHub API to create a branch
      const createBranchResponse = await axios.post(`https://api.github.com/repos/MaikeyR/project-showcase/git/refs`, {
        ref: `refs/heads/${branchName}`,
        sha: commitSHA
      }, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      if (createBranchResponse.status === 201) {
        console.log("Branch created successfully");
        await createFolder(projectID, markdownContent, branchName);
        // Other actions...
      } else {
        throw new Error("Failed to create branch");
      }
    } else {
      throw new Error("Failed to fetch commit SHA of the base branch");
    }
  } catch (error) {
    throw new Error("Error creating branch: " + error.message);
  }
}

async function createFolder(projectID, markdownContent, branchName) {
  // Implement the logic to create a folder here
  // Use axios to make API calls to GitHub
  const folderPath = `Project-Showcase/content/${projectID}`;
  const folderKeep = ".keep"; // Use a filename that resembles a folder

  try {
    // Use the GitHub API to create a folder
    const response = await axios.put(`https://api.github.com/repos/MaikeyR/project-showcase/contents/${folderPath}/${folderKeep}`, {
      branch: branchName,
      message: "Create folder",
      content: ""
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (response.status === 201) {
      console.log("Folder created successfully");
      await createMarkdownFile(markdownContent, branchName, folderPath);
    } else {
      throw new Error("Failed to create project");
    }
  } catch (error) {
    console.error(error);
    // Handle error scenario
  }
}

async function createMarkdownFile(markdownContent, branchName, folderPath) {
  // Implement the logic to create a markdown file here
  // Use axios to make API calls to GitHub
  const fileName = "index.md";

  try {
    // Use the GitHub API to create a file
    const response = await axios.put(`https://api.github.com/repos/MaikeyR/project-showcase/contents/${folderPath}/${fileName}`, {
      branch: branchName,
      message: "Create markdown file",
      content: Buffer.from(markdownContent).toString('base64')
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (response.status === 201) {
      console.log("Markdown file created successfully");
      // Other actions...
    } else {
      throw new Error("Failed to create markdown file");
    }
  } catch (error) {
    console.error(error);
    // Handle error scenario
  }
}

// Call the generateProject function with example values
generateProject(projectTitle, projectDescription, authors, client, theme, tags, thumbnail);
