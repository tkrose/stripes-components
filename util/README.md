# `stripes-components` utility functions

This `util` area contains utility functions, whereas `../lib` contains utility components.

<!-- ../../okapi/doc/md2toc -l 2 README.md -->
* [this.transitionToParams(params)](#thistransitiontoparamsparams)
* [makePathFunction(basePath, findAll, queryTemplate, sortMap, filterConfig)](#makepathfunctionbasepath-findall-querytemplate-sortmap-filterconfig)
    * [Parameters](#parameters)


## this.transitionToParams(params)

Must be invoked with `this` bound to a React component that is beneath a React Router match, so that `this.props.location` and `this.context.router` are both defined.

Takes as its argument an object containing _key_: _value_ pairs. It transitions to a URL that is the same as the present one except that the specified query parameters are included -- replacing the same-named parameters if they already exist, and adding new parameters where they do not.

For example, if you are at the URL:
```
http://localhost:3000/users?filters=active.Active&sort=Name
```
and invoke this function as:
```
this.transitionToParams({ query: 'water', sort: 'Email' })
```
The application will transition to the new URL:
```
http://localhost:3000/users?filters=active.Active&sort=Water&query=Email
```
The `filters` query parameter is unaffected (since it was not included in the parameters passed in), the old `sort` value `Name` is replaced by the new value `Email`, and the new parameter `query` is added with the value `water`.

## makeQueryFunction(findAll, queryTemplate, sortMap, filterConfig, failOnCondition)

Makes and returns a function, suitable to be used as the `query` param of a stripes-connect resource configuration. The function is itself configured by five parameters, which will vary depending on the module that is using it, and will use these to determine how to interpret the query, filters and sort-specification in the application state. It is generally used as follows:
```
static manifest = Object.freeze({
  items: {
    type: 'okapi',
    records: 'items',
    path: 'item-storage/items',
    params: {
      query: makeQueryFunction(
        'cql.allRecords=1',
        'materialType="${query}" or barcode="${query}*" or title="${query}*"',
        { 'Material Type': 'materialType' },
        filterConfig,
        2
      ),
    },
    staticFallback: { params: {} },
  },
});
```

The five parameters are:

* `findAll` -- a CQL string that can be used to find all records, for situations where no query or filters are specified and the application wants all records to be listed.
* `queryTemplate` -- a CQL string into which the query and other data can be substituted, using the same syntax as [path substitution in stripes-connect](https://github.com/folio-org/stripes-connect/blob/master/doc/api.md#text-substitution): for example, `?{query}` interpolates the `query` parameter from the URL.
* `sortMap` -- an object mapping the names of columns in the display to the CQL sort-specifiers that they should invoke when clicked on.
* `filterConfig` -- the configuration of the application's filter as passed to [the `<FilterGroups>` component](../lib/FilterGroups/readme.md#filter-configuration).
* `failOnCondition` -- an optional indicator of how to behave when no query and/or filters are provided. Can take the following values:
  * `0`: do not fail even if query and filters and empty
  * `1`: fail if query is empty, whatever the filter state
  * `2`: fail if both query and filters and empty.

  For backwards compatibility, `false` (or omitting the argument altogether) is equivalent to `0` , and `true` is equivalent to `1`.


## makePathFunction(basePath, findAll, queryTemplate, sortMap, filterConfig)

Makes and returns a path-function, suitable to be used as the `path` member of a stripes-connect resource configuration. The function is itself configured by five parameters, which will vary depending on the module that is using it. It is generally used as follows:
```
static manifest = Object.freeze({
  items: {
    type: 'okapi',
    records: 'items',
    path: makePathFunction(
      'item-storage/items',
      'materialType=*',
      'materialType="${query}" or barcode="${query}*" or title="${query}*"',
      { 'Material Type': 'materialType' },
      filterConfig
    ),
    staticFallback: { path: 'item-storage/items' },
  },
});

```
### Parameters

* `basePath` -- the path to the resource to be searched on the Okapi service.
* `findAll` -- a string that can be used to find all records (to be combined with the sort specification when there is no explicit query and no filtering). **Note.** It ought not to be necessary to specify this, as `*` or `cql.allRecords=1` should always work, but our present implementation requires it.
* `queryTemplate` -- a template string from which the main query can be generated by substituting in the query string that the user supplies. All instances of the string `${query}` in the string will be replaced by the user's query string.
* `sortMap` -- an object mapping sort-criterion names as they appear in the UI module's column headings to the names of the corresponding fields in the underlying web-service. When these are identical, no map need be supplied, and the former will be used in the place of the latter.
* `filterConfig` -- the configuration structure that describes the UI module's filter groups, as described in [the `<FilterGroups>` documentation](../lib/FilterGroups/readme.md)

