# collection-format-mindmap

## What is the collection format?
The collection format is a lightweight specification for defining API workflows and organizing API requests. It provides you with an intuitive, machine and human-readable format for working with APIs.

It is similar to API specifications like the OpenAPI and the AsyncAPI, except that a collection is not focused on what the surface layer or exposed interface of an API should look like but instead on what is needed to successfully run that API and how different requests interact with each other to form a functional workflow for that API.

## Problem Statement
The collection format is the API specification that drives collections in Postman. Collections have existed for many years, and over time, there have been different toolings built around the format both by Postman and its community. Numerous platforms integrate with the format and build atop it, giving how interoperable collections are. Despite the adoption of the specification, it is still very difficult to learn about the format itself because it lacks learning resources. 

Previously, the only learning resource that existed for the collection format was the [auto-generated documentation](https://schema.postman.com/) and the publicly available [schema](https://schema.postman.com/collection/json/v2.1.0/draft-07/collection.json). This is changing as we consciously try to lower the barrier to learning about collections. Recently, we released a new documentation for the collection format. This gives a friendlier introduction to collections and walks you through the different parts of a collection. The documentation is available at the learning center and can be found [here](https://learning.postman.com/collection-format).

## Collection format mind map
This project is part of the ongoing effort stated above to create an increasing amount of learning resources around the format. The mind map will serve as a friendly way of learning about the different units of a collection, what they do, and visually present how each unit of a collection is connected to each other.

### Structure
This was inspired by the [OpenAPI mindmap](https://openapi-map.apihandyman.io/) and the structure is TBD, but there will be similarities between the two. There will be a mindmap with several nested nodes that can be collapsed/opened. And depending on which node is currently active, there will be a section dedicated to explaining that node, what it does, and how to make use of it. The following will be tentatively included in the section describing the nodes. 

- Description.
- If it is a required field or not.
- Usage. A small code snippet showing how it can be used in a specific part of a collection.
- If the type of that node is an object, it will be helpful to show a table highlighting that object's fields and whether or not they are required. 
- Any other helpful information

This [whimsical diagram](https://whimsical.com/collection-mind-map-6H8Ck1ntSmJqev5uD5pWnp) gives an example of what a very, very basic version of the mind map will look like. Note that the whimsical diagram does not indicate the final structure.

## Contact
If you have any questions or queries, please [create an issue](openapi-web-search) on this repo (with a prefix GSoC 2023), start a topic on [our community forums in the GSoC category](https://community.postman.com/c/open-technology/gsoc/42) or send an email to us at gsoc@postman.com.

[![Twitter](https://img.shields.io/badge/Twitter-%40getpostman-orange?logo=twitter&logoColor=white)](https://twitter.com/getpostman) [![YouTube](https://img.shields.io/badge/YouTube-%40postman-orange?logo=youtube)](https://www.youtube.com/c/postman)
