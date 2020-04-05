[![logo](https://raw.githubusercontent.com/dry-python/brand/master/logo/project.png)](https://github.com/dry-python)

---

# A set of libraries for pluggable business logic components

The dry-python project enforce clean architecture and domain-driven
design in your application.

The easiest way to make your code simple to reason about.

dry-python is a collection of libraries aimed to help you to build an application in your domain.

## Principles

- [Express business rules with pure-python objects](#express-business-rules-with-pure-python-objects)
- [Express business scenarios with DSL](#express-business-scenarios-with-dsl)
- [Read business objects directly from multiple data sources](#read-business-objects-directly-from-multiple-data-sources)
- [Build a composition of these objects without boilerplate](#build-a-composition-of-these-objects-without-boilerplate)
- [Use business logic as a library in your web application stack](#use-business-logic-as-a-library-in-your-web-application-stack)

## Express business rules with pure-python objects

Write small isolated testable classes with segregated interface.
Express your business rules in without coupling to any library related
to HTTP transport layer, ORM database layer, and even our set of
tools. From [Clean
Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
point of view this will be your **entities** layer. From
[Domain-driven
design](https://en.wikipedia.org/wiki/Domain-driven_design)
perspective this will be your **domain business rules** layer.

```pycon

>>> from attr import attrs, attrib

>>> @attrs
... class Buyer:
...     user_id = attrib()
...     balance = attrib()
...
...     def is_able_to_purchase(self, cost):
...         return self.balance > cost

>>> @attrs
... class Order:
...     order_id = attrib()
...     items = attrib()
...
...     def could_be_processed(self):
...         return all(item.is_available for item in self.items)

```

## Express business scenarios with DSL

Write your business process with expressive language.

```pycon

>>> from attr.validators import is_callable
>>> from stories import story, arguments, Success, Failure

>>> @attrs
... class Purchase:
...     @story
...     @arguments("user_id", "order_id")
...     def make(I):
...         I.find_buyer
...         I.find_invoice
...         I.check_balance
...         I.check_availability
...         I.persist_payment
...         I.persist_purchase
...         I.send_notifications
...
...     # Steps.
...
...     def find_buyer(self, ctx):
...         ctx.buyer = self.load_buyer(self.user_id)
...         return Success()
...
...     def find_invoice(self, ctx):
...         ctx.order = self.load_order(self.order_id)
...         return Success()
...
...     def check_balance(self, ctx):
...         if not ctx.buyer.is_able_to_purchase(ctx.order.cost):
...             return Failure("low balance")
...         return Success()
...
...     def check_availability(self, ctx):
...         if not ctx.order.could_be_processed():
...             return Failure("is not available")
...         return Success()
...
...     def persist_payment(self, ctx):
...         ...
...
...     # Dependencies.
...
...     load_buyer = attrib(validator=is_callable)
...     load_order = attrib(validator=is_callable)

```

## Read business objects directly from multiple data sources

```pycon

>>> from mappers import Mapper
>>> from project.db.models import UserTable, OrderTable

>>> mapper = Mapper(Buyer, UserTable, {"user_id": "pk"})

>>> @mapper.reader.of(Buyer)
... def load_buyer(user_id):
...     return UserTable.objects.filter(pk=user_id)

>>> mapper = Mapper(Order, OrderTable, {"order_id": "pk"})

>>> @mapper.reader.of(Order)
... def load_order(order_id):
...     return OrderTable.objects.filter(pk=order_id)

```

## Build a composition of these objects without boilerplate

```pycon

>>> from dependencies import Injector

>>> class MakePurchase(Injector):
...     purchase = Purchase
...     load_buyer = load_buyer
...     load_order = load_order

```

## Use business logic as a library in your web application stack

```pycon

>>> from django.views.generic import FormView
>>> from django.urls import reverse_lazy
>>> from project.web.forms import PurchaseForm

>>> class MakePurchaseView(FormView):
...     template_name = "make_purchase.html"
...     form_class = PurchaseForm
...     success_url = reverse_lazy("complete-purchase")
...
...     def form_valid(self, form):
...         MakePurchase.purchase.make(user_id=form.user_id, order_id=form.order_id)
...         return super().form_valid(form)

```

<p align="center">&mdash; ⭐️ &mdash;</p>
<p align="center"><i>Drylabs maintains dry-python and helps those who want to use it inside their organizations.</i></p>
<p align="center"><i>Read more at <a href="https://drylabs.io">drylabs.io</a></i></p>
