---
layout: post
title:  "C++ random stuff"
categories: software-development
---

This post goal is to sum up in one place all the random stuff regarding C++ that I've been learning from a lot of
time ago. I really believe that one of the best ways to learn something is to teach someone. In that case, one
teaches and two learn. Let me go through some special topics.

## What is RAII?

RAII is the acronym for "Resource Acquisition Is Initialization" (this is also called Scope-Bound Resource
Management or its acronym SBRM). It's a programming technique that binds the *life
cycle* of a resource that must be acquired before use to the lifetime of an object. The resources we're referring to
are the ones that are very limited. Some examples of that resources can be:

* pre allocated heap memory
* opened socket
* thread of execution
* opened file
* locked mutex
* disk space
* database connection

The goal of RAII is to guarantees that the resource is available for the code that is going to use it so you don´t
need to check if the resource is available for you because you are confident of that.

It also guarantees that the resources will be released once the object which resources are linked to reaches its end of life. This occurs in the reverse order of creation:

> * **Creation:** Resources -> Object controller creation
> * **Destruction:** Object controller destruction -> Resources

The way of assure that is that the constructor of the controller fails if the resources can not be acquired and
exits reaching an exception.

For extending information you can read [this](https://en.cppreference.com/w/cpp/language/raii)

## C++ Design patterns

I thought about writing here regarding the design patterns but as it will be very long, I decided better to write
it here: [Design Patterns in C++](/_posts/software-development/2024-04-28-cpp-design-patterns.md)
