[![logo](https://raw.githubusercontent.com/dry-python/brand/master/logo/project.png)](https://github.com/dry-python)

---

# A set of libraries for pluggable business logic components

The easiest way to make your code simple to reason about.

dry-python is a collection of libraries aimed to help you to build an application in your domain.

## Stories

You can define business logic processes with clear DSL.

```pycon

>>> from stories import story, arguments

>>> class BuySubscription:
...     @story
...     @arguments("price_id", "user")
...     def buy(I):
...         I.find_price
...         I.check_balance
...         I.persist_payment
...         I.persist_subscription
...         I.send_subscription_notification
...         I.show_category

```

## Dependencies

You can integrate it into frameworks you already use.

```pycon

>>> from dependencies import Injector, operation, this
>>> from dependencies.contrib.django import view
>>> from django.http import HttpResponse
>>> from django.shortcuts import redirect

>>> @view
... class BuySubscriptionView(Injector):
...     buy_subscription = workflows.BuySubscription.buy
...     price_id = this.kwargs["id"]
...
...     @operation
...     def post(buy_subscription, price_id, user):
...         result = buy_subscription.run(price_id, user)
...         if result.is_success:
...             return redirect(result.value)
...         elif result.failed_on("check_balance"):
...             return HttpResponse("<h1>Error: not enough money</h1>")

```

And a framework of your choice will not even notice the change.

```pycon

>>> from .views import BuySubscriptionView

>>> urlpatterns = [
...     path("buy_subscription/<int:id>/", BuySubscriptionView.as_view()),
... ]

```

Drylabs maintains dry-python and helps those who want to use it inside their organizations. Read more at drylabs.io
