export type ProductLinkKind = 'npm' | 'site' | 'github'

export interface ProductItem {
  name: string
  url: string
  description: string
  linkKind: ProductLinkKind
}

export const PRODUCT_LIBRARIES: ProductItem[] = [
  {
    name: '@eklabdev/regexid',
    url: 'https://www.npmjs.com/package/@eklabdev/regexid',
    description:
      'A deterministic, lexicographic regex match generator for fixed-length patterns. Generate predictable sequences of regex matches with support for literal and ranged character sets, making it perfect for testing, data generation, and pattern matching applications.',
    linkKind: 'npm',
  },
  {
    name: '@eklabdev/loggerts4',
    url: 'https://www.npmjs.com/package/@eklabdev/loggerts4',
    description:
      'A modular and extensible TypeScript logging library with multiple channels, log levels, and stage 2 decorators. Supports both synchronous and asynchronous logging with built-in console and file channels, plus extensible custom channel support.',
    linkKind: 'npm',
  },
  {
    name: '@eklabdev/blingts4',
    url: 'https://www.npmjs.com/package/@eklabdev/blingts4',
    description:
      'A TypeScript library providing enhanced functionality and utilities for modern TypeScript development. Built with TypeScript 4+ features and designed for developer productivity.',
    linkKind: 'npm',
  },
  {
    name: '@eklabdev/gochan',
    url: 'https://www.npmjs.com/package/@eklabdev/gochan',
    description:
      'A channel-based communication library inspired by Go channels, bringing goroutine-like concurrency patterns to JavaScript and TypeScript. Perfect for managing asynchronous operations and concurrent workflows.',
    linkKind: 'npm',
  },
  {
    name: '@eklabdev/bling',
    url: 'https://www.npmjs.com/package/@eklabdev/bling',
    description:
      'A lightweight utility library for JavaScript and TypeScript that provides essential helper functions and common patterns to streamline development workflows.',
    linkKind: 'npm',
  },
  {
    name: '@eklabdev/dotjson',
    url: 'https://www.npmjs.com/package/@eklabdev/dotjson',
    description:
      'A utility library for working with JSON data using dot notation. Easily access, modify, and manipulate nested JSON structures with a simple and intuitive API.',
    linkKind: 'npm',
  },
  {
    name: '@eklabdev/superset',
    url: 'https://www.npmjs.com/package/@eklabdev/superset',
    description:
      'A comprehensive set manipulation library for JavaScript and TypeScript. Perform set operations, intersections, unions, and more with an easy-to-use API for working with collections and data sets.',
    linkKind: 'npm',
  },
  {
    name: '@eklabdev/logger',
    url: 'https://www.npmjs.com/package/@eklabdev/logger',
    description:
      'A flexible and powerful logging library for Node.js and browser environments. Features multiple log levels, customizable formatters, and support for various output destinations to help you debug and monitor your applications effectively.',
    linkKind: 'npm',
  },
  {
    name: '@eklabdev/dfsm',
    url: 'https://www.npmjs.com/package/@eklabdev/dfsm',
    description:
      'A durable finite state machine runtime with provider-agnostic persistence and queue-driven execution. Define machines, stores, queues, and workflows that survive restarts and scale across workers.',
    linkKind: 'npm',
  },
]

export const PRODUCT_TOOLS: ProductItem[] = [
  {
    name: 'OpenDagger',
    url: 'https://opendagger.eklab.xyz',
    description:
      'An open YAML standard for documenting database design — OpenAPI/Swagger, but for databases. Capture personas, use cases, workflows, entities, and relations in one document that stakeholders and engineers can review together.',
    linkKind: 'site',
  },
  {
    name: 'EKTools',
    url: 'https://ektool.eklab.xyz',
    description:
      'A comprehensive toolkit for software developers and hobbyists to carry out various transformations and operations. Streamline your workflow with powerful utilities designed to make development tasks easier and more efficient.',
    linkKind: 'site',
  },
  {
    name: 'alternative-hictopswapper',
    url: 'https://github.com/EklabDev/alternative-hictopswapper',
    description:
      'An AMS-safe Bambu Lab plate-swap 3MF concatenator. Merge sliced BambuStudio plates into one continuous-print package while preserving AMS filament maps, colors, and tray IDs. Available as a Python CLI, local web UI, and Docker image.',
    linkKind: 'github',
  },
  {
    name: 'VectorClient',
    url: 'https://github.com/EklabDev/vectorclient',
    description:
      'An API gateway for AI-powered workflows. Create API keys, route requests, view call history, and integrate with vector databases such as Weaviate for knowledge-backed endpoints.',
    linkKind: 'github',
  },
  {
    name: 'VibeQuiz',
    url: 'https://github.com/EklabDev/vibequiz',
    description:
      'A VS Code extension that turns your git diff into a multiple-choice quiz. Pass the configured score to unlock creating a GitHub pull request, with score and questions filled into your PR template.',
    linkKind: 'github',
  },
  {
    name: 'Weaviate View',
    url: 'https://github.com/EklabDev/weviateview',
    description:
      'An Electron desktop app for exploring Weaviate collections. Browse schemas, run BM25, vector, and hybrid search, and create, edit, or delete objects with a local connection settings store.',
    linkKind: 'github',
  },
  {
    name: 'jdkvm',
    url: 'https://github.com/EklabDev/jdkvm',
    description:
      'A cross-platform, user-local JDK version manager (nvm-style) for environments where you cannot install JDKs system-wide. Installs Eclipse Temurin builds and switches JAVA_HOME in the current shell.',
    linkKind: 'github',
  },
]

export function productCtaLabel(linkKind: ProductLinkKind): string {
  switch (linkKind) {
    case 'npm':
      return 'View on npm'
    case 'github':
      return 'View on GitHub'
    case 'site':
      return 'Visit Tool'
  }
}
