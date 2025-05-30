# Wong Lab Website

This project contains the source code for the [Wong Lab
website](https://wonglab.seas.ucla.edu). The site is built with Next.js and is
deployed with GitHub Pages. The website is designed to require minimal upkeep
and will automatically redeploy when changes are made to this repository via
GitHub Actions.

## Updating Research Pages

MDX files are a combination of Markdown and JSX syntax, which allows for the
creation of dynamic and interactive content. In other words, you can just write
the page content in normal Markdown and add interactive components as needed.

In the context of the Wong Lab website, each research page is represented by an
MDX file located in the `research` folder. When the website is built, each MDX
file is transformed into a single page on the website, with the URL matching its
file path relative to the `research` folder. This means that if an MDX file is
located at `research/my-research-page.mdx`, it will be transformed into a page
at `https://wonglab.seas.ucla.edu/research/my-research-page`. This allows for
easy navigation and organization of the research pages on the website.

The "home page" for the research section is located at `research/index.mdx`.

## Updating Members and Publications

There are two files that need to be changed when either updating the list of lab
members and the list of publications: `members.yaml` and `pubs.yaml`.

### Members List

To update the members list, simply add or modify the entries in this file. This
can be done through the GitHub web interface or via the web version of VS Code
accessed by pressing the `.` key on the repository page. When a commit is made
and pushed, the deployment action will automatically run.

The following is an example of the expected fields for an active member. This is
what is displayed in the [members
section](https://wonglab.seas.ucla.edu/#members) of the website.

```yaml
- name: Jonathan Chen
  alt-names:
    - Jonathan W. Chen
  role: Ph.D. Student
  email: jwhc@ucla.edu
  orcid: 0000-0001-5283-243X
```

Note that the whitespace indentation levels are important for YAML files. The
`alt-names` field contains any alternative spellings of a members name and is
used to highlight that member's name in the [publications
section](https://wonglab.seas.ucla.edu/#publications). The [ORCID](orcid.org)
here is only used in the member's section at the moment.

Currently, the order of `members.yaml` is semi-important. There is some sorting
by role but otherwise the members will appear in order as they appear within
this YAML file.

### Publications List

The publications list is stored in `pubs.yaml`. This file tracks the relevant
metadata about each publication and is sorted from newest to oldest. The
publications appear in the [publications
section](https://wonglab.seas.ucla.edu/#publications) of the website in the same
order they appear here.

To add a new publication, two things must be done:

1. Add the [DOI](doi.org) to [this Google
Sheet](https://docs.google.com/spreadsheets/d/1YSRcqjtj4xT1oEDEDnn_om2EqMzZiKljYdVMmWhh9KY/edit?usp=sharing).
   This is used to automatically generate the expected PDF file name for the
   publication. This is necessary as DOIs cannot be used as file names since they
   contain `/` and other special characters. The Google Sheet is used to map
   DOIs to file names and to record the expected publications.

2. Add the [DOI](doi.org) to the `pubs.yaml` file on a new line.

   ```yaml
    - doi: 10.1038/s41586-021-03546-8
    - doi: 10.1038/s41586-021-03546-8
   ```

   The DOI should be added to the top of the file. The rest of the metadata will
   be automatically generated by the deployment action. The metadata for a
   publication is fetched using the [Crossref](https://www.crossref.org/) API
   with it's DOI. The relavent metadata is then extracted and added to the YAML
   file.

3. Add the corresponding PDF to the `public/pdf` directory. The PDF should be
   named after the DOI as prepared by the Google Sheet from the Step 1 with the
   `.pdf` extension. For example, the PDF for the above DOI would be named
   `10.1038~s41586-021-03546-8.pdf`. Then add the pdf name on a new line below DOI.
   
   ```yaml
    - doi: 10.1038/s41586-021-03546-8
      pdf: 10.1038~s41586-021-03546-8.pdf
    - doi: 10.1038/s41586-021-03546-8
   ```

   The PDF can be added to the repository via the GitHub web interface or by
   cloning the repository to a local computer, adding the PDF, and pushing the
   changes.

5. (Optionally) There are also some additional fields that may be displayed if
   present in the article metadata. These include `pressrelease`, `preprint`, `commentary`,
   and `cover`. Each of these fields should have a `name` and `url`. For example,
   the following is an example of a publication with a press release and a cover image

   ```yaml
    - doi: 10.1038/s41586-021-03546-8
      pdf: 10.1038~s41586-021-03546-8.pdf
      pressrelease:
        name: UCLA Newsroom
        url: https://newsroom.ucla.edu/releases/some-press-release
      cover:
        name: Nature
        url: https://www.nature.com/articles/s41586-021-03546-8/figures/1
   ```

6. (Optionally) A separate write-up can be added for each paper. This should be a
   MDX file located in the `pages/publications/` directory. The name of the
   file will be the url of the write-up. As a convention, the file name should
   be all lowercase with hyphens between words.

   The write-up should contain the following frontmatter:

   ```mdx
   const meta = {
      doi: "10.1038/s41586-021-03546-8",
      author:
         - name: "Write-up Author",
         - name: "Another Write-up Author",
      date: "2021-08-01"
   }

   # Write-Up Title
   ...
   ```

   Additionally, it must be added to the corresponding publication entry in the `pubs.yaml` file:

   ```yaml
    - doi: 10.1038/s41586-021-03546-8
      writeup: pages/publications/my-write-up.mdx
   ```

   The write-up can be added to the repository via the GitHub web interface or by cloning the repository to a local computer, adding the write-up, and pushing the changes.

To finalize your changes, you will need to make a git commit and push the commit
to GitHub. Again, this triggers the deployment action which will automatically
update the website. You can see its progress by clicking on the "Actions" tab at
the top of the repository page.

## Changing the Website

This is website is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It may be useful to read the [Next.js documentation](https://nextjs.org/docs)
for more information about what is possible with this framework. The project
also uses [Tailwind CSS](https://tailwindcss.com/) for styling.

It is important to note that the site is a static website. This means that the
website is generated at build time and is not dynamically generated when a user
visits the site. This means that any changes made to the site will not be
reflected until the site is rebuilt. This is done automatically by GitHub
Actions when a commit is pushed to the repository. This also means that only a
subset of Next.js features are available. For example, [API
routes](https://nextjs.org/docs/api-routes/introduction) are not available.

### Getting Started

After cloning the repository, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/index.js`. The page
auto-updates as you edit the file.

Everytime you load the page, the site is rebuilt. This means that any changes to
the `members.yaml` and `pubs.yaml` will be reloaded. In particular for the
`pubs.yaml` file, this means that any new publications will be fetched and added
to the site. This is an alternative method of updating the publications list
that allows the Action to skip the fetching step.

To finalize any changes you have made locally, you will need to prepare a commit
with the changes. Again, this triggers the deployment action which will update
the website. You can see its progress by clicking on the "Actions" tab at the
top of the repository page. No further steps are necessary.
