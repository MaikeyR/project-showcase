const studentAccountName = "Maikel Reijneke";
const accessToken = "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"; // personal accesstoken from the owner of the repository (Default token from "MaikeyR" expires on Wed, Sep 6 2023)

const menuButton = document.querySelector(".home-menuButton");
const menuOptions = document.querySelector(".home-menuOptions");

menuButton.addEventListener("click", function() {
  menuOptions.classList.toggle("show");
});

document.addEventListener("click", function(event) {
  const target = event.target;
  if (!menuButton.contains(target) && !menuOptions.contains(target)) {
    menuOptions.classList.remove("show");
  }
});


// Example usage
const projectTitle = "My project for DIT";
const projectDescription = "This is a project description";
const authors = "Jan Koudijs, Robbin van de Scheur";
const client = "Client Name";
const theme = "Theme Name";
const tags = ["tag1", "tag2, tag3"];
const thumbnail = "thumbnail.jpg";
const projectContent = "Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content Project content ";

async function generateProject(projectTitle, projectDescription, authors, client, theme, tags, thumbnail, projectContent) {
    try {
        const sanitizedTitle = projectTitle.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
        const projectID = sanitizedTitle.toLowerCase();
        const allAuthors = studentAccountName + ", " + authors;

        const markdownContent = generateMarkdownContent(projectTitle, projectDescription, allAuthors, client, theme, tags, thumbnail, projectContent, projectID);
        await createBranch(projectID, markdownContent);
        console.log("Project created successfully!");
      } catch (error) {
        console.error("Failed to create project:", error);
      }
    }

generateProject(projectTitle, projectDescription, authors, client, theme, tags, thumbnail, projectContent);


function sanitizeTitle(projectTitle) {
  // Remove special characters and replace spaces with hyphens
  const sanitizedTitle = projectTitle.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

  return sanitizedTitle;
}

function generateMarkdownContent(projectTitle, projectDescription, allAuthors, client, theme, tags, thumbnail, projectContent, projectID) {
    const uploadDate = formatDate(); // Format the date using a custom formatDate function
  
    const content = `---
title: "${projectTitle}"
date: ${uploadDate}
draft: false
link: /${projectID}/

image: /${projectID}/${thumbnail}
naam: "${authors}"
opdrachtgever: "${client}"
thema: "${theme}"
tags: [${tags}]
samenvatting: "${projectDescription}"
---

${projectContent}
`        
    return content;
}

function formatDate() {
// Format the date in your desired format
// You can use JavaScript date manipulation libraries like Moment.js to simplify this task
// Here's an example using the built-in Date object:
const formattedDate = new Date().toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});

return formattedDate;
}



// Function to create a branch
async function createBranch(projectID, markdownContent) {
  const branchName = projectID;
  const baseBranch = "main"; // Replace main with the name of the base branch if it's different

  try {
    // Fetch the commit SHA of the base branch
    const response = await fetch(`https://api.github.com/repos/MaikeyR/project-showcase/branches/${baseBranch}`);
    if (response.ok) {
      const data = await response.json();
      const commitSHA = data.commit.sha;

      // Use the GitHub API to create a branch
      const createBranchResponse = await fetch(`https://api.github.com/repos/MaikeyR/project-showcase/git/refs`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: commitSHA
        })
      });

      if (createBranchResponse.ok) {
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

// Function to create a folder within the branch
async function createFolder(projectID, markdownContent, branchName) {
  const folderPath = `Project-Showcase/content/${projectID}`;
  const folderKeep = ".keep"; // Use a filename that resembles a folder
  console.log(folderPath);

  try {
    // Use the GitHub API to create a folder (Example using fetch API)
    const response = await fetch(`https://api.github.com/repos/MaikeyR/project-showcase/contents/${folderPath}/${folderKeep}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        branch: branchName,
        message: "Create folder",
        content: ""
      })
    });

    if (response.ok) {
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

// Function to create a markdown file within the folder
async function createMarkdownFile(markdownContent, branchName, folderPath) {
  const fileName = "index.md";

  try {
    // Use the GitHub API to create a file (Example using fetch API)
    const response = await fetch(`https://api.github.com/repos/MaikeyR/project-showcase/contents/${folderPath}/${fileName}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        branch: branchName,
        message: "Create markdown file",
        content: btoa(markdownContent) // Convert content to base64
      })
    });

    if (response.ok) {
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