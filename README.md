# sails-hook-passportjs
Sails authentication hook using Passport.

Currently extremely small! I'm not sure yet which way I'll go with this package. It could become a rewrite of the original sails-generate-auth package since although being awesome, that package has some design choices which make it unusable in the situation I want to use it. Things I want to change in the package design:
* Change it from being a generator to a Sails hook.
* Have the email being optional/configurable (in my application I actually do not ask for an email address when registering :o).
* Remove all frontend views to make this into an API only (I do not use a view engine).
