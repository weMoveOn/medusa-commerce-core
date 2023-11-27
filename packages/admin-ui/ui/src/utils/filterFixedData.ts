import { IFilters } from "../types/inventoryProduct"

export const  filterForTemporal:IFilters={
  shop:{
    typeKey: "sortType",
    orderKey: "sortOrder",
    values: [
      {
        title: "1688",
        key: "onesixeighteight",
        value: "10",
        selected: true
      },
      {
        title: "AliExpress",
        key: "aliexpress",
        value: "1",
        selected: false
      },
      {
        title: "Taobao",
        key: "taobao",
        value: "4",
        selected: false
      },
      {
        title: "Alibaba",
        key: "alibaba",
        value: "11",
        selected: false
      },
    ]
  },
  sorter: {
    typeKey: "sortType",
    orderKey: "sortOrder",
    values: [
      {
        title: "Best match",
        key: "Default",
        value: "Asc",
        selected: true
      },
      {
        title: "Price (Low to High)",
        key: "Price",
        value: "Asc",
        selected: false
      },
      {
        title: "Price (High to Low)",
        key: "Price",
        value: "Desc",
        selected: false
      },
      {
        title: "Total Price",
        key: "TotalPrice",
        value: "Desc",
        selected: false
      },
      {
        title: "Vendor Rating",
        key: "VendorRating",
        value: "Desc",
        selected: false
      }
    ]
  },
  configurator: {
    pr: {
      title: "Price",
      type: "range",
      key: "pr",
      separator: "-",
      values: [
        {
          value: "5.00-25.00",
          image: null,
          label: "Chosen by 32%",
          selected: false
        },
        {
          value: "30.00-75.00",
          image: null,
          label: "Chosen by 37%",
          selected: false
        },
        {
          value: "100.00-250.00",
          image: null,
          label: "Chosen by 15%",
          selected: false
        }
      ]
    },
    cid: {
      title: "Categories",
      type: "tree",
      key: "cid",
      separator: ",",
      values: [
        {
          value: "121448028",
          image: null,
          label: "Jewelry",
          selected: false
        },
        {
          value: "121424023",
          image: null,
          label: "Neck",
          selected: false
        },
        {
          value: "otc-2789",
          image: null,
          label: "Rings",
          selected: false
        },
        {
          value: "otc-4832",
          image: null,
          label: "Decorations",
          selected: false
        },
        {
          value: "otc-2206",
          image: null,
          label: "Folding knives",
          selected: false
        },
        {
          value: "otc-4921",
          image: null,
          label: "Balloons",
          selected: false
        },
        {
          value: "333112",
          image: null,
          label: "German",
          selected: false
        },
        {
          value: "otc-651",
          image: null,
          label: "T-shirts, pullovers",
          selected: false
        },
        {
          value: "otc-752",
          image: null,
          label: "Socks, tights",
          selected: false
        },
        {
          value: "otc-2781",
          image: null,
          label: "Charms, pendants",
          selected: false
        },
        {
          value: "otc-811",
          image: null,
          label: "High boots, Booties",
          selected: false
        },
        {
          value: "otc-2787",
          image: null,
          label: "Bracelets",
          selected: false
        },
        {
          value: "50015988",
          image: null,
          label: "Devices for video games",
          selected: false
        },
        {
          value: "otc-3",
          image: null,
          label: "Тaobao",
          selected: false
        },
        {
          value: "50004779",
          image: null,
          label: "Traditional Chinese medicine",
          selected: false
        },
        {
          value: "otc-5594",
          image: null,
          label: "Other devices",
          selected: false
        },
        {
          value: "otc-2786",
          image: null,
          label: "Chains on hand",
          selected: false
        },
        {
          value: "otc-4926",
          image: null,
          label: "Miscellaneous",
          selected: false
        },
        {
          value: "otc-2859",
          image: null,
          label: "Stickers",
          selected: false
        },
        {
          value: "otc-384",
          image: null,
          label: "Materials for the repair of bags",
          selected: false
        },
        {
          value: "121384032",
          image: null,
          label: "Neck",
          selected: false
        },
        {
          value: "otc-4924",
          image: null,
          label: "Candles",
          selected: false
        },
        {
          value: "121386034",
          image: null,
          label: "Jewelry",
          selected: false
        },
        {
          value: "otc-3430",
          image: null,
          label: "Machines for removing pilling",
          selected: false
        },
        {
          value: "otc-2474",
          image: null,
          label: "Other",
          selected: false
        },
        {
          value: "50102001",
          image: null,
          label: "Rice paper",
          selected: false
        },
        {
          value: "125024006",
          image: null,
          label: "Jewelry",
          selected: false
        },
        {
          value: "50004749",
          image: null,
          label: "Prevention and treatment of common diseases",
          selected: false
        },
        {
          value: "otc-3445",
          image: null,
          label: "Aksessuaoy for communication devices",
          selected: false
        },
        {
          value: "50004748",
          image: null,
          label: "TCM",
          selected: false
        },
        {
          value: "otc-2207",
          image: null,
          label: "Multitools",
          selected: false
        },
        {
          value: "otc-1040",
          image: null,
          label: "Accessories",
          selected: false
        },
        {
          value: "otc-653",
          image: null,
          label: "Sweatshirts, hoodies",
          selected: false
        },
        {
          value: "otc-809",
          image: null,
          label: "Shoes",
          selected: false
        },
        {
          value: "otc-6240",
          image: null,
          label: "Music on CD, DVD",
          selected: false
        },
        {
          value: "121370028",
          image: null,
          label: "Other DIY accessories accessories",
          selected: false
        },
        {
          value: "124542007",
          image: null,
          label: "Cultural and creative bracelet",
          selected: false
        },
        {
          value: "50458012",
          image: null,
          label: "Card support",
          selected: false
        },
        {
          value: "otc-608",
          image: null,
          label: "Dresses, sundresses",
          selected: false
        },
        {
          value: "121466003",
          image: null,
          label: "Bath ball",
          selected: false
        },
        {
          value: "otc-3845",
          image: null,
          label: "Cross-stitch",
          selected: false
        },
        {
          value: "otc-6421",
          image: null,
          label: "Machines for removing pilling",
          selected: false
        },
        {
          value: "otc-2792",
          image: null,
          label: "Hair Accessories",
          selected: false
        },
        {
          value: "121462009",
          image: null,
          label: "NAN",
          selected: false
        },
        {
          value: "201835317",
          image: null,
          label: "Fisherman",
          selected: false
        },
        {
          value: "125204012",
          image: null,
          label: "DC stabilization power supply",
          selected: false
        },
        {
          value: "otc-4136",
          image: null,
          label: "Containers, lunchbox",
          selected: false
        },
        {
          value: "otc-4929",
          image: null,
          label: "Lights",
          selected: false
        },
        {
          value: "otc-2791",
          image: null,
          label: "Table Decorations",
          selected: false
        },
        {
          value: "otc-5836",
          image: null,
          label: "Paper for notes",
          selected: false
        }
      ]
    },
    features: {
      title: "Valuation",
      type: "checkbox",
      key: "features",
      separator: ",",
      values: [
        {
          value: "Discount:true",
          image: null,
          label: "Only Discounted",
          selected: false
        },
        {
          value: "IsStock:true",
          image: null,
          label: "Only Have Stock",
          selected: false
        },
        {
          value: "Tmall:true",
          image: null,
          label: "Only Tmall Items",
          selected: false
        },
        {
          value: "Tmall:false",
          image: null,
          label: "Only Taobao Items",
          selected: false
        }
      ]
    },
    attr: {
      title: "Attribute",
      type: "attribute",
      key: "attr",
      separator: ";",
      values: [
        {
          value: "1627207",
          image: null,
          label: "Sort by color",
          selected: false,
          values: [
            {
              value: "1627207--3232483",
              image: null,
              label: "ArmyGreen",
              selected: false
            },
            {
              value: "1627207--3232484",
              image: null,
              label: "Azure",
              selected: false
            },
            {
              value: "1627207--28341",
              image: null,
              label: "Black",
              selected: false
            },
            {
              value: "1627207--90554",
              image: null,
              label: "Orange",
              selected: false
            },
            {
              value: "1627207--3232481",
              image: null,
              label: "Chocolate",
              selected: false
            },
            {
              value: "1627207--28332",
              image: null,
              label: "Light grey",
              selected: false
            },
            {
              value: "1627207--28320",
              image: null,
              label: "White",
              selected: false
            },
            {
              value: "1627207--30156",
              image: null,
              label: "Light green",
              selected: false
            },
            {
              value: "1627207--60092",
              image: null,
              label: "Light yellow",
              selected: false
            },
            {
              value: "1627207--3232478",
              image: null,
              label: "Dark gray",
              selected: false
            },
            {
              value: "1627207--28326",
              image: null,
              label: "Red",
              selected: false
            },
            {
              value: "1627207--3232482",
              image: null,
              label: "772-1 gray gray",
              selected: false
            },
            {
              value: "1627207--3232479",
              image: null,
              label: "Dark purple",
              selected: false
            },
            {
              value: "1627207--28338",
              image: null,
              label: "Blue",
              selected: false
            },
            {
              value: "1627207--28340",
              image: null,
              label: "Navy blue",
              selected: false
            },
            {
              value: "1627207--3232480",
              image: null,
              label: "Pink",
              selected: false
            },
            {
              value: "1627207--28329",
              image: null,
              label: "Purple Fanghua top",
              selected: false
            },
            {
              value: "1627207--28335",
              image: null,
              label: "Green",
              selected: false
            },
            {
              value: "1627207--80882",
              image: null,
              label: "Violet",
              selected: false
            },
            {
              value: "1627207--28324",
              image: null,
              label: "Yellow",
              selected: false
            },
            {
              value: "1627207--130164",
              image: null,
              label: "Color",
              selected: false
            },
            {
              value: "1627207--28327",
              image: null,
              label: "Burgundy top",
              selected: false
            },
            {
              value: "1627207--132069",
              image: null,
              label: "750-3 pink",
              selected: false
            },
            {
              value: "1627207--107121",
              image: null,
              label: "755-1 black",
              selected: false
            },
            {
              value: "1627207--28334",
              image: null,
              label: "Grey",
              selected: false
            },
            {
              value: "1627207--28328",
              image: null,
              label: "【Black+gold】GT2 42mm special case",
              selected: false
            },
            {
              value: "1627207--21962",
              image: null,
              label: "Tunu Kyoto",
              selected: false
            },
            {
              value: "1627207--21965",
              image: null,
              label: "Black",
              selected: false
            },
            {
              value: "1627207--21966",
              image: null,
              label: "PZ30B manual wind door",
              selected: false
            },
            {
              value: "1627207--28321",
              image: null,
              label: "Milky",
              selected: false
            },
            {
              value: "1627207--155052449",
              image: null,
              label: "Large Fortune Tree",
              selected: false
            },
            {
              value: "1627207--30155",
              image: null,
              label: "Apricot",
              selected: false
            },
            {
              value: "1627207--4266701",
              image: null,
              label: "Off white",
              selected: false
            },
            {
              value: "1627207--28331",
              image: null,
              label: "Khaki",
              selected: false
            }
          ]
        },
        {
          value: "售后服务",
          image: null,
          label: "After -sales service",
          selected: false,
          values: [
            {
              value: "售后服务--店铺保修",
              image: null,
              label: "Shop warranty",
              selected: false
            },
            {
              value: "售后服务--其他",
              image: null,
              label: "Other",
              selected: false
            },
            {
              value: "售后服务--复检后再付款",
              image: null,
              label: "Pay after re -examination",
              selected: false
            }
          ]
        },
        {
          value: "20509",
          image: null,
          label: "Size",
          selected: false,
          values: [
            {
              value: "20509--28315",
              image: null,
              label: "M",
              selected: false
            },
            {
              value: "20509--28316",
              image: null,
              label: "L",
              selected: false
            },
            {
              value: "20509--28317",
              image: null,
              label: "XL",
              selected: false
            },
            {
              value: "20509--28314",
              image: null,
              label: "S",
              selected: false
            },
            {
              value: "20509--28383",
              image: null,
              label: "Average code",
              selected: false
            },
            {
              value: "20509--28318",
              image: null,
              label: "XXL",
              selected: false
            },
            {
              value: "20509--6145171",
              image: null,
              label: "2XL",
              selected: false
            },
            {
              value: "20509--115781",
              image: null,
              label: "3XL",
              selected: false
            },
            {
              value: "20509--28319",
              image: null,
              label: "XXXL",
              selected: false
            },
            {
              value: "20509--28313",
              image: null,
              label: "XS",
              selected: false
            },
            {
              value: "20509--1523835870",
              image: null,
              label: "155-170cm",
              selected: false
            },
            {
              value: "20509--3727387",
              image: null,
              label: "4XL",
              selected: false
            },
            {
              value: "20509--1523835872",
              image: null,
              label: "170-180cm",
              selected: false
            },
            {
              value: "20509--1523835873",
              image: null,
              label: "160-175cm",
              selected: false
            },
            {
              value: "20509--1579450679",
              image: null,
              label: "180-190cm",
              selected: false
            },
            {
              value: "20509--1525127821",
              image: null,
              label: "175-185cm",
              selected: false
            }
          ]
        },
        {
          value: "9066257",
          image: null,
          label: "Ring inch",
          selected: false,
          values: [
            {
              value: "9066257--3755861",
              image: null,
              label: "Orange Smurra Treasure Bare Stone 1.1ct",
              selected: false
            },
            {
              value: "9066257--86345530",
              image: null,
              label: "DZ01 is cautious to place an order with the actual live product of the live broadcast",
              selected: false
            },
            {
              value: "9066257--3478988",
              image: null,
              label: "Pendant+ring",
              selected: false
            },
            {
              value: "9066257--3979749",
              image: null,
              label: "Ruby bracelet",
              selected: false
            },
            {
              value: "9066257--3388352",
              image: null,
              label: "Ring",
              selected: false
            },
            {
              value: "9066257--3979774",
              image: null,
              label: "Zodiac snake",
              selected: false
            },
            {
              value: "9066257--3979815",
              image: null,
              label: "Zodiac horse",
              selected: false
            },
            {
              value: "9066257--3979844",
              image: null,
              label: "Calculated according to the gold price on the day of the store, contact before shooting",
              selected: false
            },
            {
              value: "9066257--86345532",
              image: null,
              label: "Zodiac chicken",
              selected: false
            },
            {
              value: "9066257--3979889",
              image: null,
              label: "Zodiac monkey",
              selected: false
            }
          ]
        },
        {
          value: "20549",
          image: null,
          label: "Size",
          selected: false,
          values: [
            {
              value: "20549--418624880",
              image: null,
              label: "39 Normal code, 8cm with high",
              selected: false
            },
            {
              value: "20549--229418985",
              image: null,
              label: "40",
              selected: false
            },
            {
              value: "20549--103189693",
              image: null,
              label: "38 Normal code, 8cm with high",
              selected: false
            },
            {
              value: "20549--59280855",
              image: null,
              label: "36 Normal code, 8cm with high",
              selected: false
            },
            {
              value: "20549--72380707",
              image: null,
              label: "37 Normal code, 8cm with high",
              selected: false
            },
            {
              value: "20549--296172561",
              image: null,
              label: "35 Normal code, 8cm with high",
              selected: false
            },
            {
              value: "20549--225078235",
              image: null,
              label: "43",
              selected: false
            },
            {
              value: "20549--407396361",
              image: null,
              label: "41",
              selected: false
            },
            {
              value: "20549--473680452",
              image: null,
              label: "42",
              selected: false
            }
          ]
        },
        {
          value: "是否是套装",
          image: null,
          label: "Whether it is a suit",
          selected: false,
          values: [
            {
              value: "是否是套装--否",
              image: null,
              label: "No",
              selected: false
            },
            {
              value: "是否是套装--是",
              image: null,
              label: "Yes",
              selected: false
            }
          ]
        },
        {
          value: "品牌",
          image: null,
          label: "Brand",
          selected: false,
          values: [
            {
              value: "品牌--other/其他",
              image: null,
              label: "Other/Other",
              selected: false
            },
            {
              value: "品牌--俪萌珠宝",
              image: null,
              label: "Mo Meng Jewelry",
              selected: false
            }
          ]
        },
        {
          value: "产地",
          image: null,
          label: "Place of origin",
          selected: false,
          values: [
            {
              value: "产地--中国大陆",
              image: null,
              label: "Chinese mainland",
              selected: false
            },
            {
              value: "产地--中国",
              image: null,
              label: "China",
              selected: false
            }
          ]
        },
        {
          value: "款式",
          image: null,
          label: "Shape",
          selected: false,
          values: [
            {
              value: "款式--吊坠",
              image: null,
              label: "Pendant",
              selected: false
            },
            {
              value: "款式--戒指/指环",
              image: null,
              label: "Ring/ring",
              selected: false
            }
          ]
        },
        {
          value: "161712509",
          image: null,
          label: "Main drill score（lowest）",
          selected: false,
          values: [
            {
              value: "161712509--34297140",
              image: null,
              label: "30 points",
              selected: false
            },
            {
              value: "161712509--49918948",
              image: null,
              label: "50 points",
              selected: false
            },
            {
              value: "161712509--8032822",
              image: null,
              label: "1 carat",
              selected: false
            },
            {
              value: "161712509--60733568",
              image: null,
              label: "40 marks",
              selected: false
            },
            {
              value: "161712509--42371278",
              image: null,
              label: "60 points",
              selected: false
            },
            {
              value: "161712509--16442808",
              image: null,
              label: "20 points",
              selected: false
            }
          ]
        },
        {
          value: "鉴定标识",
          image: null,
          label: "Appraisal",
          selected: false,
          values: [
            {
              value: "鉴定标识--国内鉴定",
              image: null,
              label: "Domestic appraisal",
              selected: false
            },
            {
              value: "鉴定标识--国际鉴定",
              image: null,
              label: "International appraisal",
              selected: false
            }
          ]
        },
        {
          value: "镶嵌材质",
          image: null,
          label: "Mosaic material",
          selected: false,
          values: [
            {
              value: "镶嵌材质--未镶嵌",
              image: null,
              label: "Not inlaid",
              selected: false
            },
            {
              value: "镶嵌材质--白18K金",
              image: null,
              label: "White 18K gold",
              selected: false
            },
            {
              value: "镶嵌材质--纯银镶嵌宝石",
              image: null,
              label: "Stone inlay, with gem",
              selected: false
            }
          ]
        },
        {
          value: "鉴定类别",
          image: null,
          label: "Appraisal category",
          selected: false,
          values: [
            {
              value: "鉴定类别--国土资源部广州质检中心",
              image: null,
              label: "Guangzhou Quality Inspection Center, the Ministry of Land and Resources",
              selected: false
            },
            {
              value: "鉴定类别--中国地质大学珠宝检测中心",
              image: null,
              label: "China University of Geosciences Jewelry Inspection Center",
              selected: false
            },
            {
              value: "鉴定类别--其它鉴定机构",
              image: null,
              label: "Other appraisal agencies",
              selected: false
            },
            {
              value: "鉴定类别--GIA证书",
              image: null,
              label: "GIA certificate",
              selected: false
            }
          ]
        },
        {
          value: "122276380",
          image: null,
          label: "Color",
          selected: false,
          values: [
            {
              value: "122276380--874050245",
              image: null,
              label: "F-G/Youbai",
              selected: false
            },
            {
              value: "122276380--874064112",
              image: null,
              label: "D-e/extremely white",
              selected: false
            },
            {
              value: "122276380--712634333",
              image: null,
              label: "I-j/light white",
              selected: false
            },
            {
              value: "122276380--874022613",
              image: null,
              label: "H/white",
              selected: false
            }
          ]
        },
        {
          value: "销售渠道类型",
          image: null,
          label: "Sales channel type",
          selected: false,
          values: [
            {
              value: "销售渠道类型--纯电商(只在线上销售)",
              image: null,
              label: "Pure e -commerce (only online sales)",
              selected: false
            },
            {
              value: "销售渠道类型--天猫尊享款",
              image: null,
              label: "Tmall Zun Enlightenment",
              selected: false
            },
            {
              value: "销售渠道类型--商场同款(线上线下都销售)",
              image: null,
              label: "The same model of the mall (sold online and offline)",
              selected: false
            }
          ]
        },
        {
          value: "上市时间",
          image: null,
          label: "Listing time",
          selected: false,
          values: [
            {
              value: "上市时间--2020年夏季",
              image: null,
              label: "Summer, 2020",
              selected: false
            },
            {
              value: "上市时间--2020年春季",
              image: null,
              label: "2020 spring",
              selected: false
            },
            {
              value: "上市时间--2020年秋季",
              image: null,
              label: "2020, autumn",
              selected: false
            },
            {
              value: "上市时间--2020年冬季",
              image: null,
              label: "2020 winter",
              selected: false
            },
            {
              value: "上市时间--2019年春季",
              image: null,
              label: "Spring 2019",
              selected: false
            },
            {
              value: "上市时间--2019年秋季",
              image: null,
              label: "2019, autumn",
              selected: false
            }
          ]
        },
        {
          value: "是否商场同款",
          image: null,
          label: "Whether to do the same mall",
          selected: false,
          values: [
            {
              value: "是否商场同款--否",
              image: null,
              label: "No",
              selected: false
            },
            {
              value: "是否商场同款--是",
              image: null,
              label: "Yes",
              selected: false
            }
          ]
        },
        {
          value: "21735",
          image: null,
          label: "Diamond clarity",
          selected: false,
          values: [
            {
              value: "21735--43431",
              image: null,
              label: "Si/Xiaotu",
              selected: false
            },
            {
              value: "21735--43701",
              image: null,
              label: "Vs/micro flaw",
              selected: false
            },
            {
              value: "21735--43430",
              image: null,
              label: "VVS/Extreme Flaw",
              selected: false
            },
            {
              value: "21735--43429",
              image: null,
              label: "LC/Under mirror flawless",
              selected: false
            }
          ]
        },
        {
          value: "价格区间",
          image: null,
          label: "Price range",
          selected: false,
          values: [
            {
              value: "价格区间--20001-50000元",
              image: null,
              label: "20001-50000 yuan",
              selected: false
            },
            {
              value: "价格区间--10001-20000元",
              image: null,
              label: "10001-20000 yuan",
              selected: false
            },
            {
              value: "价格区间--5001-10000元",
              image: null,
              label: "5001-10000 yuan",
              selected: false
            },
            {
              value: "价格区间--201-300元",
              image: null,
              label: "201-300 yuan",
              selected: false
            },
            {
              value: "价格区间--51-100元",
              image: null,
              label: "51-100 yuan",
              selected: false
            },
            {
              value: "价格区间--101-200元",
              image: null,
              label: "101-200 yuan",
              selected: false
            }
          ]
        },
        {
          value: "适用性别",
          image: null,
          label: "Applicable gender",
          selected: false,
          values: [
            {
              value: "适用性别--女",
              image: null,
              label: "Female",
              selected: false
            },
            {
              value: "适用性别--情侣",
              image: null,
              label: "Couple",
              selected: false
            },
            {
              value: "适用性别--中性",
              image: null,
              label: "Neutral",
              selected: false
            }
          ]
        },
        {
          value: "开本",
          image: null,
          label: "Format",
          selected: false,
          values: [
            {
              value: "开本--16开",
              image: null,
              label: "16",
              selected: false
            },
            {
              value: "开本--32开",
              image: null,
              label: "32",
              selected: false
            }
          ]
        },
        {
          value: "优化处理方式",
          image: null,
          label: "Optimized processing method",
          selected: false,
          values: [
            {
              value: "优化处理方式--无处理",
              image: null,
              label: "Unprocessed",
              selected: false
            }
          ]
        },
        {
          value: "成色",
          image: null,
          label: "Colors",
          selected: false,
          values: [
            {
              value: "成色--全新",
              image: null,
              label: "Brand new",
              selected: false
            }
          ]
        },
        {
          value: "形状",
          image: null,
          label: "Shape",
          selected: false,
          values: [
            {
              value: "形状--圆形",
              image: null,
              label: "Circular",
              selected: false
            }
          ]
        },
        {
          value: "作者",
          image: null,
          label: "Author",
          selected: false,
          values: [
            {
              value: "作者--无",
              image: null,
              label: "None",
              selected: false
            },
            {
              value: "作者--中里巴人",
              image: null,
              label: "Zhongliba",
              selected: false
            }
          ]
        },
        {
          value: "认证标识",
          image: null,
          label: "Authentication",
          selected: false,
          values: [
            {
              value: "认证标识--CAL、CMA和CNAS/CNAL",
              image: null,
              label: "CAL, CMA and CNAS/CNAL",
              selected: false
            },
            {
              value: "认证标识--CMA和CNAS/CNAL",
              image: null,
              label: "CMA and CNAS/CNAL",
              selected: false
            }
          ]
        },
        {
          value: "种地类型",
          image: null,
          label: "Type",
          selected: false,
          values: [
            {
              value: "种地类型--冰糯种",
              image: null,
              label: "Ice -glutinous seed",
              selected: false
            },
            {
              value: "种地类型--冰种",
              image: null,
              label: "Ice",
              selected: false
            }
          ]
        },
        {
          value: "材质",
          image: null,
          label: "Material",
          selected: false,
          values: [
            {
              value: "材质--银饰",
              image: null,
              label: "Silver jewelry",
              selected: false
            },
            {
              value: "材质--其他",
              image: null,
              label: "Other",
              selected: false
            }
          ]
        },
        {
          value: "适用对象",
          image: null,
          label: "Suitable",
          selected: false,
          values: [
            {
              value: "适用对象--青年（18-40周岁）",
              image: null,
              label: "Youth（18-40 years old）",
              selected: false
            },
            {
              value: "适用对象--青年",
              image: null,
              label: "Youth",
              selected: false
            },
            {
              value: "适用对象--通用",
              image: null,
              label: "Universal",
              selected: false
            }
          ]
        },
        {
          value: "钻石切工",
          image: null,
          label: "Diamond cut",
          selected: false,
          values: [
            {
              value: "钻石切工--VG/很好",
              image: null,
              label: "VG/Very good",
              selected: false
            },
            {
              value: "钻石切工--完美",
              image: null,
              label: "Perfect",
              selected: false
            }
          ]
        },
        {
          value: "是否现货",
          image: null,
          label: "Whether spot",
          selected: false,
          values: [
            {
              value: "是否现货--现货",
              image: null,
              label: "Spot goods",
              selected: false
            }
          ]
        },
        {
          value: "图案",
          image: null,
          label: "Pattern",
          selected: false,
          values: [
            {
              value: "图案--纯色",
              image: null,
              label: "Solid color",
              selected: false
            },
            {
              value: "图案--其他",
              image: null,
              label: "Other",
              selected: false
            }
          ]
        },
        {
          value: "副钻分数",
          image: null,
          label: "Sub -drill score",
          selected: false,
          values: [
            {
              value: "副钻分数--无副钻",
              image: null,
              label: "No auxiliary diamond",
              selected: false
            },
            {
              value: "副钻分数--10分以下",
              image: null,
              label: "Less than 10 points",
              selected: false
            },
            {
              value: "副钻分数--10分(含)-29分(含)",
              image: null,
              label: "10 points (including) -29 points (inclusive)",
              selected: false
            }
          ]
        },
        {
          value: "镶嵌方式",
          image: null,
          label: "Mosaic",
          selected: false,
          values: [
            {
              value: "镶嵌方式--群镶",
              image: null,
              label: "Group inlaid",
              selected: false
            },
            {
              value: "镶嵌方式--单钻",
              image: null,
              label: "Single drill",
              selected: false
            },
            {
              value: "镶嵌方式--豪华群镶",
              image: null,
              label: "Luxury group inlaid",
              selected: false
            }
          ]
        },
        {
          value: "适用年龄",
          image: null,
          label: "Suitable age",
          selected: false,
          values: [
            {
              value: "适用年龄--9岁",
              image: null,
              label: "9 years",
              selected: false
            },
            {
              value: "适用年龄--8岁",
              image: null,
              label: "8 years",
              selected: false
            },
            {
              value: "适用年龄--6岁",
              image: null,
              label: "6 years",
              selected: false
            },
            {
              value: "适用年龄--14岁以上",
              image: null,
              label: "Over 14 years old",
              selected: false
            },
            {
              value: "适用年龄--10岁",
              image: null,
              label: "10 years",
              selected: false
            }
          ]
        },
        {
          value: "用途",
          image: null,
          label: "Use",
          selected: false,
          values: [
            {
              value: "用途--结婚",
              image: null,
              label: "Marry",
              selected: false
            }
          ]
        },
        {
          value: "新奇特",
          image: null,
          label: "Novelty",
          selected: false,
          values: [
            {
              value: "新奇特--新鲜出炉",
              image: null,
              label: "Freshly baked",
              selected: false
            }
          ]
        },
        {
          value: "图案/形状",
          image: null,
          label: "Pattern/shape",
          selected: false,
          values: [
            {
              value: "图案/形状--其他",
              image: null,
              label: "Other",
              selected: false
            },
            {
              value: "图案/形状--观音",
              image: null,
              label: "Guanyin",
              selected: false
            }
          ]
        },
        {
          value: "厚薄",
          image: null,
          label: "Thickness",
          selected: false,
          values: [
            {
              value: "厚薄--常规",
              image: null,
              label: "Conventional",
              selected: false
            }
          ]
        },
        {
          value: "风格",
          image: null,
          label: "Style",
          selected: false,
          values: [
            {
              value: "风格--原创设计",
              image: null,
              label: "Original design",
              selected: false
            },
            {
              value: "风格--民族风",
              image: null,
              label: "Ethnic style",
              selected: false
            },
            {
              value: "风格--中式",
              image: null,
              label: "Chinese style",
              selected: false
            }
          ]
        },
        {
          value: "出售状态",
          image: null,
          label: "Sale status",
          selected: false,
          values: [
            {
              value: "出售状态--现货",
              image: null,
              label: "Spot goods",
              selected: false
            }
          ]
        },
        {
          value: "122216545",
          image: null,
          label: "Whether it is a suit",
          selected: false,
          values: [
            {
              value: "122216545--21959",
              image: null,
              label: "No",
              selected: false
            }
          ]
        },
        {
          value: "是否开刃",
          image: null,
          label: "Whether to",
          selected: false,
          values: [
            {
              value: "是否开刃--是",
              image: null,
              label: "Yes",
              selected: false
            }
          ]
        },
        {
          value: "出版社名称",
          image: null,
          label: "Publishing House name",
          selected: false,
          values: [
            {
              value: "出版社名称--同济大学出版社",
              image: null,
              label: "Tongji University Press",
              selected: false
            }
          ]
        },
        {
          value: "适用空间",
          image: null,
          label: "Applicable space",
          selected: false,
          values: [
            {
              value: "适用空间--客厅",
              image: null,
              label: "Living room",
              selected: false
            }
          ]
        },
        {
          value: "尺码",
          image: null,
          label: "Size",
          selected: false,
          values: [
            {
              value: "尺码--39",
              image: null,
              label: "39",
              selected: false
            },
            {
              value: "尺码--40",
              image: null,
              label: "40",
              selected: false
            }
          ]
        },
        {
          value: "摆件类型",
          image: null,
          label: "Type",
          selected: false,
          values: [
            {
              value: "摆件类型--桌面摆件",
              image: null,
              label: "Desktop",
              selected: false
            }
          ]
        },
        {
          value: "基础风格",
          image: null,
          label: "Basic style",
          selected: false,
          values: [
            {
              value: "基础风格--青春流行",
              image: null,
              label: "Youth popularity",
              selected: false
            }
          ]
        },
        {
          value: "鞋底材质",
          image: null,
          label: "Sole material",
          selected: false,
          values: [
            {
              value: "鞋底材质--橡胶",
              image: null,
              label: "Rubber",
              selected: false
            }
          ]
        },
        {
          value: "金属材质",
          image: null,
          label: "Metal Material",
          selected: false,
          values: [
            {
              value: "金属材质--925银",
              image: null,
              label: "925 silver",
              selected: false
            }
          ]
        },
        {
          value: "鞋制作工艺",
          image: null,
          label: "Shoe production process",
          selected: false,
          values: [
            {
              value: "鞋制作工艺--胶粘鞋",
              image: null,
              label: "Adhesive shoes",
              selected: false
            }
          ]
        },
        {
          value: "袖型",
          image: null,
          label: "Sleeve Type",
          selected: false,
          values: [
            {
              value: "袖型--常规",
              image: null,
              label: "Conventional",
              selected: false
            }
          ]
        },
        {
          value: "132348060",
          image: null,
          label: "Tip angle",
          selected: false,
          values: [
            {
              value: "132348060--308806009",
              image: null,
              label: "Above 60 °",
              selected: false
            }
          ]
        },
        {
          value: "领型",
          image: null,
          label: "Collar",
          selected: false,
          values: [
            {
              value: "领型--圆领",
              image: null,
              label: "Round neck",
              selected: false
            }
          ]
        },
        {
          value: "鞋头款式",
          image: null,
          label: "Go toe",
          selected: false,
          values: [
            {
              value: "鞋头款式--圆头",
              image: null,
              label: "Round head",
              selected: false
            }
          ]
        },
        {
          value: "149804137",
          image: null,
          label: "Appraisal",
          selected: false,
          values: [
            {
              value: "149804137--867324621",
              image: null,
              label: "Domestic appraisal",
              selected: false
            }
          ]
        },
        {
          value: "袖长",
          image: null,
          label: "Sleeve Length",
          selected: false,
          values: [
            {
              value: "袖长--短袖",
              image: null,
              label: "With short sleeve",
              selected: false
            }
          ]
        },
        {
          value: "帮面材质",
          image: null,
          label: "Fabric material",
          selected: false,
          values: [
            {
              value: "帮面材质--PU",
              image: null,
              label: "PU",
              selected: false
            }
          ]
        },
        {
          value: "刀尖角度",
          image: null,
          label: "Tip angle",
          selected: false,
          values: [
            {
              value: "刀尖角度--60°以上",
              image: null,
              label: "Above 60 °",
              selected: false
            }
          ]
        },
        {
          value: "30681",
          image: null,
          label: "After -sales service",
          selected: false,
          values: [
            {
              value: "30681--60513",
              image: null,
              label: "Shop warranty",
              selected: false
            }
          ]
        },
        {
          value: "鞋垫材质",
          image: null,
          label: "Insole material",
          selected: false,
          values: [
            {
              value: "鞋垫材质--PU",
              image: null,
              label: "PU",
              selected: false
            }
          ]
        },
        {
          value: "闭合方式",
          image: null,
          label: "Closing method",
          selected: false,
          values: [
            {
              value: "闭合方式--系带",
              image: null,
              label: "Lace",
              selected: false
            }
          ]
        },
        {
          value: "包装方式",
          image: null,
          label: "Packing",
          selected: false,
          values: [
            {
              value: "包装方式--包装",
              image: null,
              label: "Package",
              selected: false
            }
          ]
        },
        {
          value: "作者地区",
          image: null,
          label: "Author",
          selected: false,
          values: [
            {
              value: "作者地区--中国大陆",
              image: null,
              label: "Chinese mainland",
              selected: false
            }
          ]
        },
        {
          value: "气球色泽",
          image: null,
          label: "Balloon color",
          selected: false,
          values: [
            {
              value: "气球色泽--标准色",
              image: null,
              label: "Standard color",
              selected: false
            }
          ]
        },
        {
          value: "20000",
          image: null,
          label: "Brand",
          selected: false,
          values: [
            {
              value: "20000--86306948",
              image: null,
              label: "Xiangzhenfu Jewelry/祥祯福珠宝",
              selected: false
            }
          ]
        },
        {
          value: "版型",
          image: null,
          label: "Version",
          selected: false,
          values: [
            {
              value: "版型--标准",
              image: null,
              label: "Standard",
              selected: false
            }
          ]
        },
        {
          value: "气球及配件类型",
          image: null,
          label: "Balloon and accessories type",
          selected: false,
          values: [
            {
              value: "气球及配件类型--乳胶气球",
              image: null,
              label: "Latex balloon",
              selected: false
            }
          ]
        },
        {
          value: "省份",
          image: null,
          label: "Province",
          selected: false,
          values: [
            {
              value: "省份--浙江省",
              image: null,
              label: "Zhejiang Province",
              selected: false
            }
          ]
        },
        {
          value: "134942334",
          image: null,
          label: "Size",
          selected: false,
          values: [
            {
              value: "134942334--28316",
              image: null,
              label: "28316",
              selected: false
            }
          ]
        },
        {
          value: "122216325",
          image: null,
          label: "Mosaic material",
          selected: false,
          values: [
            {
              value: "122216325--21055",
              image: null,
              label: "Not inlaid",
              selected: false
            }
          ]
        },
        {
          value: "上市年份季节",
          image: null,
          label: "Listing season",
          selected: false,
          values: [
            {
              value: "上市年份季节--2021年秋季",
              image: null,
              label: "2021 collection, autumn",
              selected: false
            }
          ]
        },
        {
          value: "-1",
          image: null,
          label: "Whether to add velvet",
          selected: false,
          values: [
            {
              value: "-1---1",
              image: null,
              label: "No",
              selected: false
            }
          ]
        },
        {
          value: "适用季节",
          image: null,
          label: "Applied season",
          selected: false,
          values: [
            {
              value: "适用季节--夏季",
              image: null,
              label: "Summer",
              selected: false
            }
          ]
        },
        {
          value: "刀具是否带弹簧力",
          image: null,
          label: "Whether the tool has spring strength",
          selected: false,
          values: [
            {
              value: "刀具是否带弹簧力--否",
              image: null,
              label: "No",
              selected: false
            }
          ]
        }
      ]
    }
  }
}