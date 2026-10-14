import { AggregateRoot } from '../entities/aggregate-root.ts';
import { UniqueEntityId } from '../entities/unique-entity-id.ts';
import { DomainEvent } from './domain-event.ts';

class SenderEvent implements DomainEvent {
  public ocurredAt: Date;
  public aggregate: CustomAggregate;

  constructor(aggregate: AggregateRoot<null>) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const custom = new CustomAggregate(null);

    custom.addDomainEvent(new SenderEvent(custom));

    return custom;
  }
}
