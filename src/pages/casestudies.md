---
pubDate: "Aug 08 2022"
title: "AstroWind template in depth"
description: "Ornare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti."
image: "~/assets/images/hero.jpg"
category: "Tutorials"
tags: [astro, tailwind css, front-end]
layout: ../layouts/PageLayout.astro
---

Resideo Technologies, Inc., formerly Honeywell Home, manufactures residential security and home automation systems.  They developed a communication device to connect legacy security panels to the Internet.  The project timeline was extremely short and they wanted a TDD/BDD approach to testing this new device.  I built a turnkey test automation framework and CI pipeline, got the development team on board, and within a few weeks the testing was in lock-step with development. The team got valuable feedback from the testing stages all the way to the end of the project.
Project Background

This new product was created to enable retrofitting internet connectivity into legacy products and was, itself, built using (slightly more recent) legacy hardware and software.  The decision to reuse existing IP made development very fast.

The engineering lead wanted maximum test coverage over the areas that were new development.  Test coverage needed to be available from Day 1 of firmware development.
The Problem: E2E Testing for IoT

    End to End is too much to cover
    Redefine the “System” to cover what matters

Testing IoT products is difficult because the end-to-end paths are longer, including many external systems that take time to respond or even introduce unwanted points of failure that exceed the scope of the System under Test (i.e. the embedded device and the software running on it).  A traditional test case could involve hardware interaction, wireless communication, cloud interfacing, backend communications, and multiple user interfaces. Because there are so many potential external points of failure, engineering teams want a way to test their specific subsystems without running into unexpected failures outside of their scope.

Embedded Linux systems provide yet another challenge. For an embedded device, end-to-end testing and unit testing is difficult to separate because developers’ code is, by the very nature of running on an entire Linux system, poorly isolated from external factors such as system software and hardware configuration. This tight coupling between code and configuration within the System under Test makes traditional engineering, Ops, and QA roles even more difficult to separate.
The Challenge: De-tangling the knot

    Separate the responsibilities of Engineering, Ops, and QA
    Don’t get everyone involved if they don’t have to be
    Limit your scope by removing overlap

The big question was: who would do this testing, QA or Engineering?

At first glance it is out of scope for both.

System, i.e. end-to-end, testing is traditionally delegated to QA testers. In the case of an Embedded Linux device, the System under Test is just one component of the greater end-to-end system. This results in an extremely inflated scope when attempting to create test procedures for traditional, manual, QA processes. In fact, covering the entire end-to-end scope with traditional methods would saturate the entire QA team’s bandwidth, taking days to cover every test case for even a single release cycle. This means that traditional QA involving manual data entry and verification is incompatible with the needs of the development team.

Developers aren’t as concerned with the “running Linux” system level as they are with the “individual process” level that they develop and write unit tests for. This makes system configuration, typically the domain of Ops, into a battleground rife with finger pointing and distracts from solving bugs by necessitating the assignment of blame before anything can be resolved. Testing integration becomes an interrogation rather than collaboration.

The developers already had excellent unit test coverage for their codebase, so we did not want to double-cover any of that.  The QA organization was comfortable with the product requirements and how the finished product would be tested end-to-end, so we did not want to overcomplicate that either.

The part not-yet covered was the inter-process communication (IPC) between processes running on the Linux system.  The IPC mechanism being used happened to be MQTT but this idea applies to any other IPC mechanism such as sockets, message queues, or even a REST API. This is where we draw the line and begin to accurately define our scope. This is the System under Test.
The Solution: Create the right tools and then get out of the way

    Test at the boundaries of the system
    Make it flexible and easy to extend
    Make it easy to maintain

Thinking of a Linux system as a collection of inter-communicating processes, I chose to create a test solution to cover the IPC interfaces only. This allowed the test framework itself to be very thin, essentially only concerning sending, receiving, and validating messages across the IPC interface.  The benefit was that it is easier to show the developers how to use it, and give them the confidence that it is valuable to use. This essentially removed the need for QA testers to be concerned at this level.

I created a custom test automation framework that isolated the System under Test. External factors that interfaced with the IPC were mocked out and exposed to the developers for them to write their own integration tests. A test execution and reporting pipeline was integrated into the CI build pipeline using Bamboo and Cucumber.

I let the developers maintain the tests, but made it as easy as possible for them.  This meant: zero maintenance of the framework itself, extremely easy to use, always works as expected.
User Feedback: Make a clean getaway

    Don’t make yourself a bottleneck
    Let the developers maintain their own tests

As a framework author and maintainer, I want to let my users do as much as possible without having to ask any questions, especially to ask me questions. The fewer questions I receive, the better quality my work is.  So that meant the framework had to be light, thin, and obvious.

The result was a complete automation framework spanning all the way from the test case descriptions, to the report being delivered after executing the tests.

After I proved this implementation the team leader had all of the developers running tests using this system, and ops people replicating the pipelines to increase coverage.  Once I trained an initial set of people, they trained each other.
Results: Numbers don’t Lie

    523 Test Cases
    5 Software Components under test
    System in use for 12 months and counting
    1342 test executions and counting

This automated test framework covered the entire range of test cases the developers needed because the developers could write their own tests with ease. The burden was completely lifted from QA, which would have been overwhelmed by the massive undertaking of covering over 500 test cases for every development release. The feedback from the tests was practically real-time, and delivered exactly the information developers wanted to see with no interdepartmental communication required.

Because the test suites would run after every git commit, it was very easy to catch bugs. There was a detailed reporting system to describe exactly what the tests were doing, but it turned out that most bugs were caught immediately because the tests ran so often. Developers could make small commits and see the test results quickly, so most of the time a pass/fail indication was as useful as reading the detailed report. The number of bugs caught is hard to measure but anecdotally I was told that every developer had caught multiple bugs with this system, saving a huge amount of time and stress.

Thus our goal was achieved: Allow the developers to focus on development, implement a CI feedback loop, and remove the stress of coordinating test cycles between several departments.

Also there were many intangible results

    General purpose and reusable
    No manual testing required
    Developers write the tests for their own code
    Minimal hardware setup required for running automated tests
    Tests maintained in-sync with development
    Teach developers about ops, testing
    Up-skilling manual testers to think about automation without coding
    Write once, use forever
    Breaking the paradigm and still being successful

Some rules are meant to be broken

BDD and Cucumber are generally not used in the way we did, but what we did was very successful.  Retrospectively I would not have done it any other way.

So, trust your intuition so you can read more stuff and take in more opinions but always be solid.
Credits and Thank-You’s

Thanks to the engineering team lead who had the original idea but trusted me to try a unique solution.

Thanks to the developers and testers, whose collaboration resulted in the solution, and whose adoption of the solution made it into a great success.

Full Disclosure: I was an employee of Resideo during the time period of this project.