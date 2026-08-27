---
layout: home
titleTemplate: false

hero:
  name: ElementAdmin v3
  text: Put the business back in control
  tagline: A lightweight admin template built with Vue 3, Element Plus, and TypeScript. Dynamic routing, multiple layouts, and shared capabilities keep clear boundaries so each application can add only the business features it needs.
  actions:
    - theme: brand
      text: Get started in 5 minutes
      link: /en/guide/getting-started
    - theme: alt
      text: Explore the architecture
      link: /en/guide/architecture

features:
  - title: Dynamic routes are the single source of truth
    details: Routes are fetched from the API after login and drive menus, pages, breadcrumbs, and tabs. There is no second business route table to maintain.
  - title: Four layouts, one route tree
    details: Classic sidebar, top navigation, mixed navigation, and dual sidebar layouts share the same route data and automatically fall back to a mobile sidebar.
  - title: Packages are ready for multiple applications
    details: Request, CRUD, form, icon rendering, and foundational UI capabilities remain independent of Admin, keeping business state out of the shared layer.
  - title: Icons work offline by default
    details: Shared components only render icons. Each application registers its own allowlist, so every App bundles only the icon data it actually uses.
  - title: Internationalization updates instantly
    details: Vue I18n, the Element Plus locale, the HTML lang attribute, and persisted state stay synchronized, so changing languages never requires a refresh.
  - title: Fewer, clearer abstractions
    details: There is no catalog of presentation components. Tables, dialogs, and detail pages belong to the application; the template maintains only capabilities that remain stable across projects.
---

<section class="runtime-flow" aria-labelledby="runtime-flow-title">
  <p class="runtime-flow__eyebrow">DYNAMIC ROUTE PIPELINE</p>
  <h2 id="runtime-flow-title">One runtime pipeline powers the entire admin application</h2>
  <div class="runtime-flow__track">
    <article>
      <span>01</span>
      <strong>Route API</strong>
      <small>The server returns paths, components, and meta</small>
    </article>
    <article>
      <span>02</span>
      <strong>Permission Store</strong>
      <small>Resolves components and stores visible routes</small>
    </article>
    <article>
      <span>03</span>
      <strong>Vue Router</strong>
      <small>Registers and resets routes within the session</small>
    </article>
    <article>
      <span>04</span>
      <strong>Layout System</strong>
      <small>Keeps menus, breadcrumbs, and TagsView in sync</small>
    </article>
  </div>
</section>

## The boundaries of v3

This is not a copy of the previous documentation. v3 removes the all-in-one component demos, client-side route filtering, and unnecessary utility wrappers. The documentation covers only capabilities that actually exist in the repository.

| The template owns                               | The application owns                       |
| ----------------------------------------------- | ------------------------------------------ |
| Login sessions, dynamic routes, access recovery | The concrete role and permission model     |
| Four layouts, menus, and TagsView               | Page architecture and business navigation  |
| Shared Request, CRUD, and form state            | Domain APIs, fields, and interaction flows |
| Icon rendering and registration                 | Each application's icon allowlist          |
| Theme and internationalization infrastructure   | Brand visuals and business copy            |

::: tip Recommended reading order

For your first integration, read [Getting Started](/en/guide/getting-started), [Project Structure and Architecture](/en/guide/architecture), and [Dynamic Routing and Permissions](/en/core/dynamic-routing) in order.

:::
