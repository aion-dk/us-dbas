# Developer guidelines

## Components

Components are not wired to the internet. This means that they must take all information as properties or from a store.

It also means that they will have to emit events or update a store, never call an API.

## Views

These are Vue Components which _are wired_ to the internet. This means that they can call APIs, gather additional information. 

These are also the ones mapped in our routes.
