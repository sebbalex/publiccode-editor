const elems = [
  {
    title: "publiccodeYamlVersion",
    label: "Publiccode Yaml Version",
    type: "array",
    description: "This key contains the version of the publicode definition.",
    items: {
      type: "string",
      enum: ["development", "0.1"]
    },
    section: 0,
    required: true,
    uniqueItems: true,
    widget: "choice-multiple-expanded"
  },
  {
    title: "name",
    label: "Name of the software",
    type: "string",
    description:
      "This key contains the name of the software. It contains the (short) public name of the product, which can be localised in the specific localisation section. It should be the name most people usually refer to the software. In case the software has both an internal 'code' name and a commercial name, use the commercial name.",
    section: 0,
    required: true
  },
  {
    title: "releaseDate",
    label: "Release Date",
    type: "string",
    description:
      "This key contains the date at which the latest version was released. This date is mandatory if the software has been released at least once and thus the version number is present.",
    widget: "date",
    section: 0,
    required: true
  },
  {
    title: "url",
    title: "Repository URL",
    type: "string",
    description:
      "A unique identifier for this software. This string must be a URL to the source code repository (git, svn, ...) in which the software is published. If the repository is available under multiple protocols, prefer HTTP/HTTPS URLs which don't require user authentication.",
    widget: "url",
    section: 0,
    required: true
  },
  {
    title: "applicationSuite",
    label: "Application Suite",
    type: "string",
    description:
      "This key contains the name of the 'suite' to which the software belongs.",
    section: 0
  },
  {
    type: "string",
    title: "landingURL",
    label: "Landing Page URL",
    description:
      "If the url parameter does not serve a human readable or browsable page, but only serves source code to a source control client, with this key you have an option to specify a landing page. This page, ideally, is where your users will land when they will click a button labeled something like 'Go to the application source code'. In case the product provides an automated graphical installer, this URL can point to a page which contains a reference to the source code but also offers the download of such an installer.",
    section: 1,
    widget: "url"
  },
  {
    title: "localisedName",
    label: "Localised Name",
    type: "string",
    description: "localisedName",
    section: 2,
    group: "summary"
  },
  {
    title: "shortDescription",
    label: "Short Description",
    type: "string",
    description: "A short description is isRequired",
    section: 0,
    group: "summary",
    required: true
  },
  {
    title: "longDescription",
    label: "Long Description",
    type: "string",
    description: "A long description is isRequired",
    section: 3,
    group: "summary",
    widget: "editor",
    required: true,
    cn: "block__item--full"
  },
  {
    title: "documentation",
    label: "Documentation",
    type: "string",
    description: "link to documentation",
    section: 1,
    group: "summary"
  },
  {
    title: "apiDocumentation",
    label: "API Documentation",
    section: 3,
    group: "summary",
    type: "string",
    description: "link to the api documentation"
  },
  {
    title: "freeTags",
    label: "Free Tags",
    section: 1,
    group: "summary",
    type: "array",
    description: "a list of tags",
    items: {
      title: "tag",
      type: "string"
    }
  },
  {
    title: "featureList",
    label: "Feature List",
    type: "array",
    description: "a list of feature that the sw has",
    items: {
      type: "string",
      title: "feature"
    },
    section: 1,
    group: "summary"
  },
  {
    title: "screenshots",
    label: "Screenshots",
    type: "array",
    description: "array of image  url",
    items: {
      type: "string",
      title: "screenshot"
    },
    section: 2,
    group: "summary"
  },
  {
    title: "videos",
    label: "Videos",
    type: "array",
    description: "link to videos",
    items: {
      type: "string",
      title: "video"
    },
    section: 2,
    group: "summary"
  },
  {
    title: "awards",
    label: "Awards",
    type: "array",
    description: "awards won",
    items: {
      type: "string",
      title: "award"
    },
    section: 2,
    group: "summary"
  },
  {
    title: "isBasedOn",
    label: "Is Based On",
    type: "string",
    description:
      "In case this software is a variant or a fork of another software, which might or might not contain a publiccode.yml file, this key will contain the url of the original project(s). The existence of this key identifies the fork as a software variant, descending from the specified repositories.",
    section: 0,
    widget: "url"
  },

  {
    type: "string",
    title: "softwareVersion",
    description:
      "This key contains the latest stable version number of the software. The version number is a string that is not meant to be interpreted and parsed but just displayed; parsers should not assume semantic versioning or any other specific version format.",
    section: 1
  },
  {
    type: "string",
    title: "logo",
    description:
      "This key contains the logo of the software. Logos should be in vector format; raster formats are only allowed as a fallback. In this case, they should be transparent PNGs, minimum 1000px of width. Acceptable formats: SVG, SVGZ, PNG",
    section: 2
  },
  {
    type: "string",
    title: "monochromeLogo",
    description:
      "A monochromatic (black) logo. The logo should be in vector format; raster formats are only allowed as a fallback. In this case, they should be transparent PNGs, minimum 1000px of width. Acceptable formats: SVG, SVGZ, PNG",
    section: 2
  },
  {
    type: "array",
    title: "platforms",
    description:
      "Values: web, windows, mac, linux, ios, android. Human readable values outside this list are allowed",
    examples: ["android", "ios"],
    items: {
      type: "string",
      enum: ["web", "windows", "mac", "linux", "ios", "android"]
    },
    section: 1
  },
  {
    title: "roadmap",
    type: "string",
    description: "A link to a public roadmap of the software.",
    section: 1,
    widget: "url"
  },
  {
    title: "developmentStatus",
    type: "array",
    uniqueItems: true,
    description: "Allowed values: concept, development, beta, stable, obsolete",

    items: {
      type: "string",
      enum: ["concept", "development", "beta", "stable", "obsolete"]
    },
    section: 1,
    required: true,
    widget: "choice-multiple-expanded"
  },
  {
    title: "softwareType",
    type: "array",
    uniqueItems: true,
    description:
      "Allowed values: standalone, addon, library, configurationFiles",

    items: {
      title: "item",
      type: "string",
      enum: ["standalone", "addon", "library", "configurationFiles"]
    },
    section: 1,
    required: true,
    widget: "choice-multiple-expanded"
  },
  {
    type: "string",
    title: "license",
    description:
      "This string describes the license under which the software is distributed. The string must contain a valid SPDX expression, referring to one (or multiple) open-source license. Please refer to the SPDX documentation for further information.",
    section: 4,
    group: "legal",
    required: true
  },
  {
    type: "string",
    title: "mainCopyrightOwner",
    description:
      "This string describes the entity that owns the copyright on 'most' of the code in the repository. Normally, this is the line that is reported with the copyright symbol at the top of most files in the repo.",
    section: 4,
    group: "legal"
  },
  {
    type: "string",
    title: "repoOwner",
    description:
      "This string describes the entity that owns this repository; this might or might not be the same entity who owns the copyright on the code itself. For instance, in case of a fork of the original software, the repoOwner is probably different from the mainCopyrightOwner.",
    section: 0,
    group: "legal",
    required: true
  },
  {
    title: "authorsFile",
    type: "string",
    description:
      "Some open-source softwares adopt a convention of identify the copyright holders through a file that lists all the entities that own the copyright. This is common in projects strongly backed by a community where there are many external contributors and no clear single/main copyright owner. In such cases, this key can be used to refer to the authors file, using a path relative to the root of the repository.",
    section: 4,
    group: "legal"
  },
  {
    title: "onlyFor",
    type: "array",
    description:
      "Public software could be very specific in scope because there is a large set of tasks that are specific to each type of administration. For instance, many softwares that are used in schools are probably not useful in hospitals. If you want to explicitly mark some software as only useful to certain types of administrations, you should add them to this key.The list of allowed values is defined in pa-types.md, and can be country-specific. This list can evolve at any time, separately from the version of this specification.",

    items: {
      type: "string"
    },
    section: 3,
    group: "intendedAudience"
  },
  {
    title: "countries",
    type: "array",
    description:
      "This key explicitly includes certain countries in the intended audience, i.e. the software explicitly claims compliance with specific processes, technologies or laws. All countries are specified using lowercase ISO 3166-1 alpha-2 two-letter country codes.",
    items: {
      title: "item",
      type: "string"
    },
    section: 3,
    group: "intendedAudience"
  },
  {
    title: "unsupportedCountries",
    type: "array",
    description:
      "This key explicitly marks countries as NOT supported. This might be the case if there is a conflict between how software is working and a specific law, process or technology. All countries are specified using lowercase ISO 3166-1 alpha-2 two-letter country codes.",
    items: {
      title: "item",
      type: "string"
    },
    section: 3,
    group: "intendedAudience"
  },
  {
    title: "usedBy",
    description:
      "A list of the names of prominent public administrations (that will serve as testimonials) that are currently known to the software maintainer to be using this software. Parsers are encouraged to enhance this list also with other information that can obtain independently; for instance, a fork of a software, owned by an administration, could be used as a signal of usage of the software.",

    type: "array",
    items: {
      type: "string"
    },
    section: 1
  },
  {
    title: "tags",
    description:
      "A list of words that can be used to describe the software and can help building catalogs of open software. Each tag must be in Unicode lowercase, and should not contain any Unicode whitespace character. The suggested character to separate multiple words is - (single dash). See also: description/[lang]/freeTags/",
    type: "array",
    items: {
      type: "string",
      enum: ["art", "backend"]
    },
    section: 0,
    required: true
  },
  {
    title: "inputTypes",
    description:
      "A list of Media Types (MIME Types) as mandated in RFC 6838 which the application can handle as output. In case the software does not support any input, you can skip this field or use application/x.empty.",
    type: "array",
    items: {
      type: "string"
    },
    section: 1
  },
  {
    title: "outputTypes",
    description:
      "A list of Media Types (MIME Types) as mandated in RFC 6838 which the application can handle as output. In case the software does not support any output, you can skip this field or use application/x.empty.",
    type: "array",
    items: {
      type: "string"
    },
    section: 1
  },
  {
    title: "localisationReady",
    type: "boolean",
    description:
      "If yes, the software has infrastructure in place or is otherwise designed to be multilingual. It does not need to be available in more than one language.",
    section: 3,
    group: "localisation"
  },
  {
    title: "availableLanguages",
    type: "array",
    description:
      "If present, this is the list of languages in which the software is available. Of course, this list will contain at least one language. See also: https://en.wikipedia.org/wiki/ISO_639-2",
    items: {
      type: "string"
    },
    section: 3,
    group: "localisation"
  },
  {
    title: "type",
    type: "array",
    description:
      "This key describes how the software is currently maintained. 'internal' means that the software is internally maintained by the repository owner. 'contract' means that there is a commercial contract that binds an entity to the maintenance of the software; 'community' means that the software is currently maintained by one or more people that donate their time to the project; 'none' means that the software is not actively maintained.",
    items: {
      type: "string",
      enum: ["internal", "contract", "community", "none"]
    },
    section: 5,
    group: "maintenance"
  },
  {
    type: "array",
    title: "contractors",
    description:
      "This key describes the entity or entities, if any, that are currently contracted for maintaining the software. They can be companies, organizations, or other collective names.",
    items: {
      title: "contractor",
      description:
        "This key contains an explicit affiliation information for the technical contact. In case of multiple maintainers, this can be used to create a relation between each technical contact and each maintainer entity. It can contain for instance a company name, an association name, etc.",
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "name",
          description:
            "mandatory - The name of the contractor, whether it's a company or a physical person."
        },
        until: {
          type: "string",
          title: "until",
          description:
            " mandatory - This is a date (YYYY-MM-DD). This key must contain the date at which the maintenance is going to end. In case of community maintenance, the value should not be more than 2 years in the future, and thus will need to be regularly updated as the community continues working on the project."
        },
        website: {
          type: "string",
          title: "website",
          description:
            "This key points to the maintainer website. It can either point to the main institutional website, or to a more project-specific page or website."
        }
      }
    },
    section: 5,
    group: "maintenance",
    cn: "block__item--full"
  },
  {
    type: "array",
    title: "contacts",
    description:
      "One or more contacts maintaining this software. This key describes the technical people currently responsible for maintaining the software. All contacts need to be a physical person, not a company or an organisation. if somebody is acting as a representative of an institution, it must be listed within the affiliation of the contact. In case of a commercial agreement (or a chain of such agreements), specify the final entities actually contracted to deliver the maintenance. Do not specify the software owner unless it is technically involved with the maintenance of the product as well.",
    items: {
      title: "contact",
      description:
        "This key contains an explicit affiliation information for the technical contact. In case of multiple maintainers, this can be used to create a relation between each technical contact and each maintainer entity. It can contain for instance a company name, an association name, etc.",
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "name",
          description:
            " mandatory - This key contains the full name of one of the technical contacts. It must be a real person; do NOT populate this key with generic contact information, company departments, associations, etc."
        },
        email: {
          type: "string",
          title: "Email",
          description:
            "This key contains the e-mail address of the technical contact. It must be an email address of where the technical contact can be directly reached; do NOT populate this key with mailing-lists or generic contact points like info@acme.inc. ",
          examples: ["lou.reed@acme.inc"]
        },
        phone: {
          type: "string",
          title: "phone",
          description: " phone number (with international prefix)"
        },
        affiliation: {
          type: "string",
          title: "affiliation",
          description:
            "This key contains an explicit affiliation information for the technical contact. In case of multiple maintainers, this can be used to create a relation between each technical contact and each maintainer entity. It can contain for instance a company name, an association name, etc."
        }
      },
      required: ["email"],
      section: 5,
      group: "maintenance",
      required: true,
      cn: "block__item--full"
    }
  },
  {
    title: "dependsOn",
    description:
      "This section provides an overview on the system-level dependencies required to install and use this software.",
    type: "array",
    items: {
      title: "dependency",
      description:
        "A dependency is a complex object. The properties are the following:",
      type: "object",
      properties: {
        type: {
          type: "array",
          title: "type",
          items: {
            type: "string",
            enum: ["open", "propietary", "hardware"]
          },
          widget: "choice-multiple-expanded"
        },
        name: {
          type: "string",
          title: "name",
          description:
            "mandatory - The name of the dependency (e.g. MySQL, NFC Reader)",
          examples: ["MySQL", "NFC Reader"]
        },
        versionMin: {
          type: "string",
          title: "versionMin",
          description: "the first compatible version",
          examples: ["1.0"]
        },
        versionMax: {
          type: "string",
          title: "versionMax",
          description: "the latest compatible version",
          examples: ["1.0"]
        },
        version: {
          type: "string",
          title: "version",
          description:
            "the only major version for which the software is compatible. It assumes compatibility with all patches and bugfixes later applied to this version.",
          examples: ["1.0"]
        },
        optional: {
          type: "boolean",
          title: "optional",
          description: "whether the dependency is optional or mandatory",
          examples: [""]
        }
      }
    },
    section: 4,
    cn: "block__item--full"
  }
];

export default elems;