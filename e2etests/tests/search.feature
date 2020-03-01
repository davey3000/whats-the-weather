Feature: Core app functionality

    Scenario: Can search for a location and report the weather forecast
        Given The app has been loaded
        When I type search location as "Cambridge"
        And I click the search button
        Then I should see the map, forecast and forecast selector
        And I should take a screenshot after 5s
