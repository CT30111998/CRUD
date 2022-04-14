from rest_framework.pagination import PageNumberPagination


class MyPagination(PageNumberPagination):
    page_size = 8

    page_size_query_param = 'page_size' 
    max_page_size = 200
    last_page_strings = ('the_end',)
    # end: 20
    # page: 2
    # pageSize: 10
    # start: 11
    # totalEntrys: 115
    # totalpage: 12