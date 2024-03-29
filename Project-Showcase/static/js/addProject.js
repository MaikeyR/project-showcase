const studentAccountName = "Maikel Reijneke"; // This should eventually be linked to CHE account logins. For linking people to added projects and managing "Mijn Projecten"

const accessToken = ""; // personal accesstoken from the owner of the repository (Default token from "MaikeyR" expires on Wed, Sep 6 2023)

// Event handler for form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const projectTitle = document.getElementById('projectTitle').value;
  const projectDescription = document.getElementById('projectDescription').value;
  const authors = document.getElementById('authors1').value;
  const client = document.getElementById('client').value;
  const theme = document.getElementById('thema').value;
  const tags = "tag";
  const thumbnail = "thumbnail";

  // Call the generateProject function with form values
  generateProject(projectTitle, projectDescription, authors, client, theme, tags, thumbnail);
}

// Add event listener to the form
document.getElementById('myForm').addEventListener('submit', handleFormSubmit);

async function generateProject(projectTitle, projectDescription, authors, client, theme, tags, thumbnail) {
    try {
        const sanitizedTitle = projectTitle.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
        const projectID = sanitizedTitle.toLowerCase();
        const allAuthors = studentAccountName + ", " + authors;

        const projectContent = compileProjectContent();

        const markdownContent = generateMarkdownContent(projectTitle, projectDescription, allAuthors, client, theme, tags, thumbnail, projectContent, projectID);
        await createBranch(projectID, markdownContent, accessToken);

        await axios.post('/api/createProject', {
          projectID,
          projectTitle,
          projectDescription,
          allAuthors,
          client,
          theme,
          tags,
          thumbnail,
          projectContent
        });

        console.log("Project created successfully!");
      } catch (error) {
        console.error("Failed to create project:", error);
      }
    }



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
naam: "${allAuthors}"
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
async function createBranch(projectID, markdownContent, accessToken) {
  const branchName = projectID;
  const baseBranch = "main"; // Replace main with the name of the base branch if it's different

  try {
    // Fetch the commit SHA of the base branch
    const response = await fetch(`https://api.github.com/repos/MaikeyR/project-showcase/branches/${baseBranch}`);
    if (response.ok) {
      const data = await response.json();
      console.log("Branch Data:", data); // test test
      const commitSHA = data.commit.sha;

      console.log("Branch Name:", branchName); // test test
      console.log("Commit SHA:", commitSHA); // test test

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