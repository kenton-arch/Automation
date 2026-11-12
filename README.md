# Automation

The Ivy Path's tools for capturing and automating repeated work.

| Page | What it is |
|---|---|
| `index.html` | Tasks page. People sign in with an email link and see each task they've recorded, with its status. |
| `task-capture/index.html` | The recorder. Screenshots and spoken words for one task, reviewed by the person, then submitted. |
| `admin/index.html` | Admin page. Every client and task, plans, approvals, what's been built, and capture clean-up. |
| `shared/` | The look (`ivy.css`) and the backend connection (`ivy.js`) used by all three. |

## How it fits together

- Pages are plain files served by GitHub Pages. There is no build step.
- Sign-in, the task list and capture files live in a Supabase project named `ivy-path`.
- The key in `shared/ivy.js` is the public one. What each person can see or change is enforced by the database's own rules, not by the pages.
- Statuses: Submitted, Needs more detail, Plan ready, Approved, Live.
- Capture pictures and words are deleted 14 days after a plan is marked ready. The plan stays.

Without signing in, the recorder still works and saves the capture as a file on the person's computer.
