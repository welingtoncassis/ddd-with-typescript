# Domain Layer

## Entity

- Entity is part of the domain layer, in which are the business rules.

## Domain Services

- It is a stateless Operation that fulfills a domain-specific task. We create a Domain Service when the operation doesn't make sense to be in an entity or isn't the entity's responsibility.

## Repositories

- It's a reference to storage. All aggregated types will have a repository. It's 1:1 between aggregated types (not only entity).
  Tips:
  Create repositories last.
  The domain doesn't need know how repositories works. In this case the domain need know only the interface that repositories implements

## Domain Events

- We use domain events to capture some changes when this happens
- Provides AuditLog
- Domain events must be an past action: UserCreated, OrderPlaced, EmailSent ...
- We can use Domain Events to notify another Bounded Contexts that changes happened

# Infrastructure Layer

- Specific layer to connect with services external to our domain layer

## Repositories

- That's where we do the persistence in the database

## Models

- Model is parte of the infra layer, in which are an database api. Generally represents an table in the database.
